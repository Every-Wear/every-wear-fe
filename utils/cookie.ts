const getCookie = (cookieName: string): string | null => {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === cookieName) {
      return decodeURIComponent(cookie[1]);
    }
  }
  return null;
};

const setCookie = (cookieName: string, value: string, days: number) => {
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + days);

  document.cookie =
    cookieName +
    "=" +
    encodeURIComponent(value) +
    "; expires=" +
    exdate.toUTCString() +
    "; path=/";
};

export { getCookie, setCookie };
