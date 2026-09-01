export const downloadCV = () => {
  const link = document.createElement("a");
  link.href = "/cv.pdf";
  link.download = "cv.pdf";
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
