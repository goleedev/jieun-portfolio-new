export function getBackgroundColor(pathname: string): string {
  switch (pathname) {
    case '/':
      return '#BCBDFD';
    case '/work':
      return '#EFEFEF';
    case '/guestbook':
      return '#BCBDFD';
    case '/resume':
      return '#C3D7F8';
    case '/blog':
      return '#46D18F';
    default:
      return '#EFEFEF';
  }
}
