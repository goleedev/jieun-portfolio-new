export function getBackgroundColor(pathname: string): string {
  switch (pathname) {
    case '/':
      return '#BCBDFD';
    case '/work':
      return '#EFEFEF';
    case '/guestbook':
      return '#46D18F';
    case '/resume':
      return '#C3D7F8';
    case '/blog':
      return '#EFEFEF';
    default:
      return '#EFEFEF';
  }
}
