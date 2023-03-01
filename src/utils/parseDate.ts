export default function ParseDate (date: Date): number | string {
  const now = new Date();
  const millisecondsElapsed = now.getTime() - date.getTime();
  const secondsElapsed = millisecondsElapsed / 1000;
  const minutesElapsed = secondsElapsed / 60;
  const hoursElapsed = Math.floor(minutesElapsed / 60);
  const remainingMinutes = Math.floor(minutesElapsed % 60);
  const daysElapsed = Math.floor(hoursElapsed / 24);

  if (hoursElapsed >= 24) {
    if (daysElapsed < 5) return `Hace ${daysElapsed} día${daysElapsed > 1 ? 's' : ''}`;
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear().toString().slice(2)}`;
  } else if (minutesElapsed >= 60) {
    return `Hace ${hoursElapsed} Hora${hoursElapsed > 1 ? 's' : ''}`;
  } else {
    if (minutesElapsed > 1) return `Hace ${Math.round(minutesElapsed)} minuto${minutesElapsed > 1 ? 's' : ''}`;
    return 'Justo ahora';
  }
}
