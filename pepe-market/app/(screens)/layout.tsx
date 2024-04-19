import TabBar from "@/components/screens/tab-bar";

export default function ScreenLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            {children}
            <TabBar />
        </div>
    );
}
