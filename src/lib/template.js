export const Templates = Object.entries(
  import.meta.glob('/src/**/*.html', {
    as: 'raw',
    eager: true
  })
).map(([path, html]) => ({
  path,
  html
}));

export const Styles = Object.entries(
  import.meta.glob('/src/**/*.scss', {
    as: 'raw',
    eager: true
  })
).map(([path, style]) => ({
  path,
  style
}));
