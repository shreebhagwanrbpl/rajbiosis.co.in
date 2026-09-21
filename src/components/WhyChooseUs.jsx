import { Boxes, FileSearch, Route, Headphones } from "lucide-react";
import SectionTitle from "./SectionTitle";
export default function WhyChooseUs(){
 const items=[
  [Boxes,"Wide catalogue","Keep instruments, kits, reagents and routine supplies in one place."],
  [FileSearch,"Clear specifications","Review practical product details before sending an enquiry."],
  [Route,"Flexible sourcing","Suitable for one-item needs as well as multi-product requirements."],
  [Headphones,"Human assistance","Get help narrowing choices when a requirement needs discussion."],
 ];
 return <section className="section-padding bg-slate-50"><div className="container-custom"><SectionTitle badge="Catalogue Approach" title="Made for varied biomedical buying needs" description="Different facilities purchase different combinations of products. The catalogue is organised to make that search easier." center/><div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">{items.map(([Icon,title,desc])=><div key={title} className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#E52428]"><Icon size={25}/></div><h3 className="mt-6 text-xl font-bold text-slate-900">{title}</h3><p className="mt-3 leading-7 text-slate-600">{desc}</p></div>)}</div></div></section>;
}
