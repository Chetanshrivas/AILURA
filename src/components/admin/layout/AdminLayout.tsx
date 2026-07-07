'use client'

import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
return (
<div className="flex h-screen overflow-hidden bg-[#F5F1EC]">

{/* Sidebar */}
<AdminSidebar />

{/* Main */}
<div className="flex flex-1 flex-col overflow-hidden">

{/* Header */}
<div className="shrink-0 border-b border-[#E9E2D8] bg-white">
<AdminHeader />
</div>

{/* Content */}
<div className="flex-1 overflow-y-auto p-6">
<main>{children}</main>
</div>

</div>
</div>
)
}