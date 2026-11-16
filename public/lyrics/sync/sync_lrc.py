#!/usr/bin/env python3
"""
sync_lrc.py - Beri timestamp pada lirik polos (.lrc tanpa waktu) memakai file audio.

Cara kerja: teks lirik "dicocokkan" ke audio (forced alignment) memakai stable-ts
(Whisper), lalu ditulis ke format  [mm:ss.xx]Teks baris

Instalasi (sekali saja):
    pip install stable-ts
    # (butuh ffmpeg terpasang; opsional untuk --demucs: pip install demucs)

Pemakaian:
    # satu lagu
    python sync_lrc.py --lrc soft.lrc --audio soft.mp3

    # semua lagu sekaligus (nama file harus sama, mis. soft.lrc <-> soft.mp3)
    python sync_lrc.py --lrc-dir ./lirik --audio-dir ./audio --out-dir ./hasil

Opsi berguna:
    --model small|medium|large   model Whisper (default: medium; makin besar makin akurat)
    --demucs                     pisahkan vokal dulu -> sering jauh lebih akurat untuk lagu
    --language en                bahasa lirik (default: en)
"""

import argparse
import re
import sys
from pathlib import Path

AUDIO_EXTS = (".mp3", ".wav", ".flac", ".m4a", ".ogg", ".opus", ".aac")


def normalize(text: str) -> str:
    """Samakan tanda kutip aneh (′ ’ ‘) menjadi apostrof biasa."""
    return text.replace("′", "'").replace("’", "'").replace("‘", "'").replace("`", "'")


def read_lyrics(path: Path):
    """Pisahkan tag header ([ti:], [ar:], ...) dan baris lirik. Buang komentar/baris kosong/timestamp lama."""
    header, lines = [], []
    for raw in path.read_text(encoding="utf-8-sig").splitlines():
        line = raw.strip()
        if not line or line.startswith(";"):
            continue
        # tag metadata seperti [ti:Soft], [ar:LANY], [offset:0]
        if re.match(r"^\[(ti|ar|al|au|by|length|re|ve|offset|tool):", line, re.I):
            if not line.lower().startswith("[offset"):
                header.append(line)
            continue
        # hapus timestamp lama bila ada
        line = re.sub(r"^(\[\d{1,2}:\d{2}(?:[.:]\d{1,3})?\])+", "", line).strip()
        if line:
            lines.append(normalize(line))
    return header, lines


def fmt_ts(seconds: float) -> str:
    cs = max(0, int(round(seconds * 100)))
    m, rest = divmod(cs, 6000)
    s, c = divmod(rest, 100)
    return f"[{m:02d}:{s:02d}.{c:02d}]"


def find_audio(base: str, audio_dir: Path):
    for ext in AUDIO_EXTS:
        p = audio_dir / f"{base}{ext}"
        if p.exists():
            return p
    return None


def sync_one(model, lrc_path: Path, audio_path: Path, out_path: Path, language: str, demucs: bool):
    header, lines = read_lyrics(lrc_path)
    if not lines:
        print(f"  ! {lrc_path.name}: tidak ada baris lirik, dilewati")
        return

    text = "\n".join(lines)
    kwargs = dict(language=language, original_split=True)
    if demucs:
        kwargs["vocal_extraction"] = True

    print(f"  > menyelaraskan {len(lines)} baris dengan {audio_path.name} ...")
    result = model.align(str(audio_path), text, **kwargs)

    segs = result.segments
    if len(segs) != len(lines):
        print(f"  ! peringatan: {len(lines)} baris lirik tapi {len(segs)} segmen hasil. "f"Periksa hasilnya secara manual.")

    out = list(header)
    for i, line in enumerate(lines):
        start = segs[i].start if i < len(segs) else (segs[-1].end if segs else 0.0)
        out.append(f"{fmt_ts(start)}{line}")

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text("\n".join(out) + "\n", encoding="utf-8")
    print(f"  OK -> {out_path}")


def main():
    ap = argparse.ArgumentParser(description="Sinkronkan lirik (.lrc polos) dengan audio.")
    ap.add_argument("--lrc", type=Path, help="file .lrc tunggal")
    ap.add_argument("--audio", type=Path, help="file audio untuk --lrc")
    ap.add_argument("--lrc-dir", type=Path, help="folder berisi banyak .lrc")
    ap.add_argument("--audio-dir", type=Path, help="folder audio (nama file sama dengan .lrc)")
    ap.add_argument("--out-dir", type=Path, default=Path("synced"), help="folder hasil (default: synced)")
    ap.add_argument("--model", default="medium", help="model Whisper (default: medium)")
    ap.add_argument("--language", default="en", help="kode bahasa lirik (default: en)")
    ap.add_argument("--demucs", action="store_true", help="ekstrak vokal dulu (lebih akurat)")
    args = ap.parse_args()

    jobs = []
    if args.lrc and args.audio:
        jobs.append((args.lrc, args.audio, args.out_dir / args.lrc.name))
    elif args.lrc_dir and args.audio_dir:
        for lrc in sorted(args.lrc_dir.glob("*.lrc")):
            audio = find_audio(lrc.stem, args.audio_dir)
            if audio is None:
                print(f"! Audio untuk {lrc.name} tidak ditemukan di {args.audio_dir}, dilewati")
                continue
            jobs.append((lrc, audio, args.out_dir / lrc.name))
    else:
        ap.error("Pakai --lrc + --audio, atau --lrc-dir + --audio-dir")

    if not jobs:
        sys.exit("Tidak ada pekerjaan yang bisa dijalankan.")

    try:
        import stable_whisper
    except ImportError:
        sys.exit("stable-ts belum terpasang. Jalankan: pip install stable-ts")

    print(f"Memuat model Whisper '{args.model}' ...")
    model = stable_whisper.load_model(args.model)

    for lrc, audio, out in jobs:
        print(f"[{lrc.stem}]")
        try:
            sync_one(model, lrc, audio, out, args.language, args.demucs)
        except Exception as e:  # lanjut ke lagu berikutnya
            print(f"  ! gagal: {e}")

    print("Selesai.")


if __name__ == "__main__":
    main()
