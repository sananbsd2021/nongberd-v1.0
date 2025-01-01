export const metadata = {
  title: 'โรงเรียนบ้านหนองเบิด',
  description: 'โรงเรียนบ้านหนองเบิด ตำบลเมืองน้อย อำเภอธวัชบุรี จังหวัดร้อยเอ็ด',
  keywords: 'Nongberd School, โรงเรียนบ้านหนองเบิด, หนองเบิด',
  icons: {
    icon: '/favicon.png', // Default favicon
    shortcut: '/favicon.ico', // Optional shortcut icon
    apple: '/apple-touch-icon.png', // Optional Apple Touch icon
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
        <main>{children}</main>
    </div>
  );
}
