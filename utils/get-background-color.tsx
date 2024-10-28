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

export function getBackgroundClass(pathname: string): string {
  switch (pathname) {
    case '/':
      return 'bg-home';
    case '/work':
      return 'bg-work';
    case '/guestbook':
      return 'bg-guestbook';
    case '/resume':
      return 'bg-resume';
    case '/blog':
      return 'bg-blog';
    default:
      return 'bg-work';
  }
}
