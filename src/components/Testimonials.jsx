import SectionTitle from "./SectionTitle";
export default function Testimonials(){
 const cards=[
  ["Routine laboratory purchase","A lab team needs several consumables and instruments together, so the catalogue helps them prepare one consolidated enquiry."],
  ["New facility setup","A growing centre can review different product groups without being restricted to a single diagnostic category."],
  ["Replacement requirement","When an existing item needs replacement, buyers can start with the product family and then compare available details."],
 ];
 return <section className="section-padding bg-slate-50"><div className="container-custom"><SectionTitle badge="Typical Use Cases" title="Different buyers, different baskets" description="The catalogue is intended for real-world biomedical purchasing situations rather than one narrow product line." center/><div className="mt-14 grid gap-6 lg:grid-cols-3">{cards.map(([t,d])=><article key={t} className="rounded-[30px] bg-white p-8 border border-slate-200"><div className="text-4xl font-black text-red-100">01</div><h3 className="mt-5 text-2xl font-bold">{t}</h3><p className="mt-4 leading-8 text-slate-600">{d}</p></article>)}</div></div></section>;
}
