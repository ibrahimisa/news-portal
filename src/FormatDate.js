export default function formatDate(datePublished) {
  let d = new Date(datePublished);
  let diff = Date.now() - d;
  let secMs = 1000;
  let minMs = 60 * secMs;
  let hourMs = 60 * minMs;
  let dayMs = 24 * hourMs;
  let weekMs = 7 * dayMs;

  if (diff < secMs) return "Right Now";
  else if (diff < minMs) return `${Math.floor(diff / secMs)} sec(s) ago`;
  else if (diff < hourMs) return `${Math.floor(diff / minMs)} min(s) ago`;
  else if (diff < dayMs) return `${Math.floor(diff / hourMs)} hour(s) ago`;
  else if (diff < weekMs) return `${Math.floor(diff / dayMs)} day(s) ago`;
  else {
    d = [
      "0" + d.getDate(),
      "0" + (d.getMonth() + 1),
      "" + d.getFullYear(),
      "0" + d.getHours(),
      "0" + d.getMinutes(),
    ].map((component) => component.slice(-2));

    return d.slice(0, 3).join("-") + " " + d.slice(3).join(":");
  }
}
