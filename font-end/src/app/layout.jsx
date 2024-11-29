import 'bootstrap/dist/css/bootstrap.min.css';
export const metadata={
  title:"CODER LOR",
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
