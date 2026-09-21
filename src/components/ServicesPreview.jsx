import Link from "next/link";
import { ArrowRight, ListChecks, MessageSquareText, Truck, Settings2 } from "lucide-react";
import SectionTitle from "./SectionTitle";
export default function ServicesPreview({city}){
 const services=[[ListChecks,"Catalogue assistance","Find relevant product families and narrow the list."],[MessageSquareText,"Requirement discussion","Share your item list, preferred specifications or application."],[Truck,"Supply coordination","Prepare a practical enquiry for single or multi-item sourcing."],[Settings2,"Equipment guidance","Get product-oriented help for instruments and supporting systems."]];
 const slug=city?`/${city.toLowerCase().replace(/\s+/g,"-")}`:"";
 return <section className="section-padding bg-white"><div className="container-custom"><SectionTitle badge="Buyer Support" title="Help beyond the product listing" description="Our support is designed around the work that happens before and after a biomedical product is selected." center/><div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">{services.map(([Icon,t,d])=><div key={t} className="rounded-[26px] border border-slate-200 p-7"><Icon size={28} className="text-[#E52428]"/><h3 className="mt-5 text-lg font-bold">{t}</h3><p className="mt-3 text-slate-600 leading-7">{d}</p></div>)}</div><div className="mt-10 text-center"><Link href={`${slug}/services`} className="inline-flex items-center gap-2 font-bold text-[#E52428]">See all service options <ArrowRight size={18}/></Link></div></div></section>;
}
