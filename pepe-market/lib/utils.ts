export function FormatToWon(price: number): string {
    return price.toLocaleString("ko-KR");
}

export function FormatToTimeAgo(date: string): string {
    const time = new Date(date).getTime();
    const now = new Date().getTime();
    const diff = Math.round((time - now) / (60 * 60 * 1000));
    const formatter = new Intl.RelativeTimeFormat("ko");

    return formatter.format(diff, "hour");
}
