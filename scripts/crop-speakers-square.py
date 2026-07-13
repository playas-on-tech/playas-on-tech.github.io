"""Generate square, face-centered speaker crops for email use."""
import cv2
from PIL import Image
from pathlib import Path

SRC_DIR = Path('website/public/assets/speakers')
OUT_DIR = Path('website/public/assets/email/speakers-square')
OUT_SIZE = 400
FACE_CASCADE = cv2.CascadeClassifier(
    str(Path(cv2.__file__).parent / 'data' / 'haarcascade_frontalface_alt2.xml')
)


def detect_face_center(path: Path):
    """Return (cx, cy) of the largest detected face, or image center."""
    gray = cv2.imread(str(path), cv2.IMREAD_GRAYSCALE)
    if gray is None:
        raise RuntimeError(f'Could not read {path}')
    h, w = gray.shape
    faces = FACE_CASCADE.detectMultiScale(
        gray, scaleFactor=1.05, minNeighbors=3, minSize=(30, 30)
    )
    if len(faces) == 0:
        print(f'  no face found, using center for {path.name}')
        return w / 2, h / 2
    largest = max(faces, key=lambda r: r[2] * r[3])
    x, y, fw, fh = largest
    return x + fw / 2, y + fh / 2


def centered_square_crop(pil_img: Image.Image, cx: float, cy: float):
    """Return a square crop centered on (cx, cy), clamped to image bounds."""
    w, h = pil_img.size
    size = min(w, h)
    half = size / 2
    left = max(0, min(cx - half, w - size))
    top = max(0, min(cy - half, h - size))
    return pil_img.crop((left, top, left + size, top + size))


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for src in sorted(SRC_DIR.iterdir()):
        if src.suffix.lower() not in {'.jpg', '.jpeg', '.png'}:
            continue
        cx, cy = detect_face_center(src)
        img = Image.open(src)
        if img.mode in ('RGBA', 'P'):
            img = img.convert('RGB')
        crop = centered_square_crop(img, cx, cy).resize(
            (OUT_SIZE, OUT_SIZE), Image.LANCZOS
        )
        out_name = src.stem + '.jpg'
        crop.save(OUT_DIR / out_name, 'JPEG', quality=90)
        print(f'{src.name} -> {out_name}')


if __name__ == '__main__':
    main()
