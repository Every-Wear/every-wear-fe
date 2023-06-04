const toBase64 = (file: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (base64: ProgressEvent<FileReader> | null) => {
      const image = new Image();

      image.src = String(base64?.target?.result);

      image.onload = (e: any) => {
        const canvas = document.createElement(`canvas`);
        const ctx: CanvasRenderingContext2D | null = canvas.getContext(`2d`);

        canvas.width = e.target.width;
        canvas.height = e.target.height;

        ctx?.drawImage(e.target, 0, 0);
        resolve(canvas.toDataURL(`image/jpeg`, 0.5));
      };
    };
    reader.onerror = err => reject(err);
  });

export { toBase64 };
