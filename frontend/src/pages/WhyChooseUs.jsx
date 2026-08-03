import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function WhyChooseUs() {
  const [expandedValues, setExpandedValues] = useState({});
  const [isMissionExpanded, setIsMissionExpanded] = useState(false);
  const [isVisionExpanded, setIsVisionExpanded] = useState(false);
  const [isIntroExpanded, setIsIntroExpanded] = useState(false);

  const toggleValueExpand = (index) => {
    setExpandedValues((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const values = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      name: "Engineering Precision",
      shortDesc: "Engineering precision is the foundation of G R F Dynamic Engineering and represents the core philosophy behind every product, process, and solution we deliver...",
      fullDesc: [
        "Engineering precision is the foundation of G R F Dynamic Engineering and represents the core philosophy behind every product, process, and solution we deliver. We believe that true industrial excellence is achieved through accuracy, consistency, technical expertise, and uncompromising attention to detail. Every vessel, storage tank, pipeline system, heat exchanger, reactor, and customized industrial solution manufactured by us reflects our commitment to precision engineering and superior performance.",
        "In modern industries, equipment reliability directly impacts productivity, safety, and operational efficiency. Understanding this critical requirement, we focus on developing engineering solutions that deliver exceptional accuracy, durability, and long-term performance. Our approach combines advanced engineering principles, detailed analysis, skilled workmanship, and internationally recognized manufacturing practices to create equipment capable of performing under demanding industrial conditions.",
        "From initial concept development to final commissioning, engineering precision guides every stage of our workflow. We believe that successful manufacturing begins with accurate planning and a deep understanding of customer requirements. Therefore, our engineering team works closely with clients to analyze their operational needs, production objectives, process conditions, and technical challenges before developing a suitable solution.",
        "Rather than providing standard solutions, we specialize in customized engineering systems designed according to specific industrial requirements. Our objective is to create equipment that integrates seamlessly with existing processes while improving productivity, reducing operational challenges, and maximizing efficiency. Every design decision is carefully evaluated to ensure the final solution delivers measurable value to our customers.",
        "Our engineering process utilizes advanced design tools and modern technologies to achieve maximum accuracy. Our experienced engineers use CAD software, 3D modeling, structural analysis, and process simulation techniques to develop optimized equipment designs. These technologies allow us to evaluate design performance, identify potential challenges, and improve reliability before manufacturing begins.",
        "Every engineering detail is carefully reviewed, including dimensions, material selection, pressure calculations, structural strength, thermal considerations, fabrication requirements, and operational conditions. This detailed approach ensures that every component is designed with accuracy and manufactured according to the highest quality expectations.",
        "Precision continues throughout our manufacturing process. We carefully select premium-quality materials such as stainless steel, carbon steel, and specialized alloys based on application requirements. Material quality plays a crucial role in equipment performance, corrosion resistance, strength, and service life. Therefore, every incoming material undergoes strict verification and quality checks before being approved for production.",
        "Our skilled manufacturing team applies advanced fabrication methods and modern production techniques to achieve exceptional accuracy. With expertise in precision cutting, CNC machining, automated welding processes, forming operations, assembly, and surface finishing, we ensure that every component meets exact engineering specifications.",
        "Special attention is given to critical manufacturing details such as weld quality, flange alignment, nozzle positioning, dimensional accuracy, and structural integrity. These factors directly influence equipment performance and operational safety. Through skilled craftsmanship and controlled manufacturing practices, we maintain consistent quality across every project.",
        "Quality assurance is an essential part of our commitment to engineering precision. We follow systematic inspection and testing procedures to verify that every product meets required standards before delivery. Our quality control process includes dimensional inspection, material traceability verification, weld inspection, surface finish evaluation, pressure testing, hydrostatic testing, and non-destructive testing methods.",
        "Advanced measuring instruments and calibrated inspection equipment are used to maintain accuracy and reliability throughout production. These quality procedures help identify potential issues at an early stage and ensure that every final product meets customer expectations for safety, performance, and durability.",
        "We follow internationally accepted engineering standards and industry guidelines to maintain the highest level of quality. Compliance with standards such as ASME, API, ISO guidelines, and other applicable regulations helps us manufacture equipment suitable for critical industrial applications. These standards provide a framework for maintaining structural integrity, operational safety, and long-term reliability.",
        "Innovation is another important element of our engineering approach. We continuously explore new technologies, advanced manufacturing methods, and digital engineering solutions to improve our capabilities. By adopting automation, modern production techniques, and improved design methodologies, we enhance efficiency, reduce manufacturing time, and deliver better-performing equipment.",
        "Our commitment to innovation enables us to support industries that require highly specialized solutions. We provide engineering expertise to sectors including pharmaceuticals, food and beverage, dairy processing, chemicals, biotechnology, oil and gas, water treatment, and power generation. Each industry presents unique challenges, and our goal is to develop solutions that improve process efficiency, maintain safety standards, and support sustainable operations.",
        "Engineering precision also contributes to cost efficiency and long-term value. Equipment manufactured with accurate design and superior workmanship requires fewer repairs, reduces maintenance requirements, and provides reliable operation throughout its service life. By focusing on quality from the beginning, we help customers achieve better productivity and reduced operational expenses.",
        "At G R F Dynamic Engineering, engineering precision is more than a technical process—it is a commitment to excellence. It represents our dedication to delivering products that combine reliability, innovation, safety, and performance. Through advanced technology, experienced professionals, strict quality control, and customer-focused engineering, we continue to create solutions that meet the highest expectations.",
        "Every project we undertake reflects our passion for precision and our promise to deliver engineering solutions built with confidence, accuracy, and excellence. By maintaining the highest standards in design, manufacturing, and quality assurance, we aim to build long-term partnerships with our customers and contribute to their success through dependable industrial engineering solutions."
      ]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      name: "Safety First",
      shortDesc: "Safety is the foundation of every solution we design, manufacture, and deliver at G R F Dynamic Engineering. We believe that industrial equipment must not only provide exceptional performance...",
      fullDesc: [
        "Safety is the foundation of every solution we design, manufacture, and deliver at G R F Dynamic Engineering. We believe that industrial equipment must not only provide exceptional performance but also ensure the highest levels of operational safety, reliability, and protection throughout its entire service life. In industries where equipment operates under high pressure, extreme temperatures, chemical exposure, and continuous production demands, safety becomes a critical factor that directly impacts people, processes, and business continuity.",
        "At G R F Dynamic Engineering, we understand that every pressure vessel, storage tank, chemical reactor, heat exchanger, process skid, and customized industrial system carries significant responsibility. Therefore, safety is integrated into every stage of our engineering and manufacturing process—from initial concept development and design calculations to fabrication, testing, installation, and final commissioning. Our approach focuses on preventing risks, improving reliability, and ensuring that every product performs safely under challenging industrial conditions.",
        "Our safety-focused engineering process begins at the design stage, where every detail is carefully analyzed using advanced engineering principles and internationally recognized standards. Before manufacturing begins, our engineering team evaluates critical parameters such as operating pressure, temperature conditions, material compatibility, corrosion resistance, structural loads, process requirements, and environmental factors.",
        "By conducting detailed design evaluations, we identify potential challenges and develop solutions that provide maximum safety and efficiency. Our engineers work closely with customers to understand their operational requirements and recommend equipment designs that support smooth production while minimizing risks. This proactive approach allows us to create systems that are not only efficient but also safe, dependable, and suitable for long-term industrial use.",
        "Material selection is another important aspect of our safety philosophy. We use high-quality stainless steel, carbon steel, and specialized industrial alloys selected according to application requirements. The correct choice of material plays a vital role in ensuring corrosion resistance, mechanical strength, durability, and overall equipment performance.",
        "All incoming materials undergo strict inspection and verification before entering the manufacturing process. Material certificates, specifications, and quality records are carefully reviewed to maintain complete traceability. This ensures that every component used in our equipment meets the required safety and performance standards.",
        "During manufacturing, we maintain strict quality control procedures to ensure every product meets our highest safety expectations. Our experienced engineers, supervisors, welders, fabricators, and quality inspectors work together to maintain accuracy and consistency throughout production.",
        "Advanced manufacturing technologies, precision fabrication methods, and controlled production processes help us achieve superior structural integrity and dependable performance. Special attention is given to critical areas such as welding quality, joint strength, dimensional accuracy, assembly alignment, and surface finishing.",
        "Our skilled welding professionals follow approved welding procedures to create strong and reliable joints. Welding quality is carefully monitored because it directly affects equipment strength and operational safety. Through proper welding practices, inspection, and testing, we ensure that every fabricated component can withstand demanding industrial conditions.",
        "Comprehensive inspection and testing are essential parts of our safety commitment. Before any equipment is delivered, it undergoes detailed quality verification and performance testing. Our testing procedures include dimensional inspection, visual examination, material verification, weld inspection, Non-Destructive Testing (NDT), hydrostatic pressure testing, pneumatic testing, dye penetrant inspection, radiographic examination, and ultrasonic thickness measurement wherever required.",
        "These advanced inspection methods allow us to identify potential defects, weaknesses, or inconsistencies before the equipment reaches the customer. By detecting and eliminating possible issues during manufacturing, we improve reliability, reduce operational risks, and increase the service life of our products.",
        "Compliance with recognized industry standards is a key element of our safety-driven manufacturing approach. Our products are designed and fabricated according to applicable national and international guidelines, including ASME Section VIII, API standards, ISO sanitary requirements, and other industry-specific regulations depending on customer applications.",
        "Following these standards ensures that every product meets strict requirements related to pressure containment, structural strength, hygiene, and operational reliability. Detailed documentation and quality records are maintained throughout the manufacturing process to provide complete transparency and traceability.",
        "Safety does not end after manufacturing. We extend our commitment through professional installation, commissioning support, and after-sales assistance. Our experienced installation teams follow proper safety procedures while handling equipment transportation, assembly, alignment, and site installation activities.",
        "During commissioning, our technical experts ensure that systems operate correctly and provide necessary guidance for safe operation. We also support customers through maintenance recommendations, technical assistance, and operational guidance to help maximize equipment reliability and minimize unexpected downtime.",
        "Preventive maintenance and regular inspection practices play an important role in maintaining long-term safety and efficiency. We help customers understand proper maintenance requirements so that equipment continues to perform effectively throughout its operational lifecycle.",
        "At G R F Dynamic Engineering, safety is more than a regulatory obligation—it is a core value that influences every decision we make. Our commitment to safety reflects our responsibility toward customers, employees, operators, and the industries we serve.",
        "By combining advanced engineering knowledge, skilled manpower, premium materials, modern manufacturing technologies, comprehensive testing, and continuous improvement practices, we deliver industrial solutions that customers can trust with complete confidence.",
        "Our safety-first approach helps protect personnel, safeguard valuable assets, improve production reliability, and support uninterrupted industrial operations. We remain dedicated to creating equipment that delivers outstanding performance while maintaining the highest standards of safety and quality.",
        "Through responsible engineering, innovation, and uncompromising attention to detail, G R F Dynamic Engineering continues to provide safe, reliable, and high-performance industrial solutions for industries including pharmaceuticals, food and beverage, dairy, chemicals, oil and gas, water treatment, power generation, and other process-driven sectors."
      ]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      name: "Customer Centricity",
      shortDesc: "Customer satisfaction is the driving force behind everything we do at G R F Dynamic Engineering. We believe that successful engineering is not only about manufacturing high-quality equipment...",
      fullDesc: [
        "Customer satisfaction is the driving force behind everything we do at G R F Dynamic Engineering. We believe that successful engineering is not only about manufacturing high-quality equipment but also about understanding customer requirements, solving operational challenges, and delivering solutions that create long-term value. Every industry has unique processes, production goals, technical requirements, and business objectives, and we recognize that each customer requires a different approach.",
        "At G R F Dynamic Engineering, we do not follow a one-size-fits-all philosophy. Instead, we focus on providing customized industrial engineering solutions that are specifically designed according to each customer's operational environment, production needs, facility layout, and future growth plans. Our customer-centric approach enables us to design, manufacture, and deliver equipment that not only meets expectations but exceeds them in terms of quality, reliability, efficiency, safety, and performance.",
        "Our relationship with customers begins long before the manufacturing process starts. We believe that understanding customer requirements is the foundation of successful project execution. Therefore, our engineering team spends valuable time analyzing customer processes, discussing technical requirements, evaluating production challenges, and understanding operational goals.",
        "During the initial consultation phase, we carefully study important factors such as production workflow, available installation space, product characteristics, utility requirements, safety considerations, automation needs, and future expansion possibilities. This detailed understanding allows us to develop practical engineering solutions that integrate smoothly with existing systems and provide maximum operational benefits.",
        "Our consultative engineering approach helps customers make informed decisions by providing technically accurate recommendations and cost-effective solutions. By considering every operational aspect before designing the equipment, we minimize installation challenges, improve process efficiency, and reduce long-term maintenance requirements.",
        "Every project undertaken by G R F Dynamic Engineering is developed with precision, flexibility, and customer-focused thinking. Whether it involves manufacturing pressure vessels, storage tanks, mixing vessels, chemical reactors, heat exchangers, process skids, CIP systems, or other customized industrial equipment, every component is carefully engineered to deliver optimum performance.",
        "Our engineers focus on every critical design aspect, including vessel dimensions, material selection, nozzle orientation, piping arrangements, insulation requirements, agitation systems, automation compatibility, and process flow optimization. These details are customized according to the customer's specific application to ensure smooth operation and maximum efficiency.",
        "By designing equipment according to actual process requirements, we help customers improve productivity, maintain consistent product quality, optimize available space, and achieve better operational control. Our objective is to provide solutions that become valuable assets for our customers and support their long-term industrial success.",
        "Quality is one of the strongest pillars of our customer commitment. We understand that customers depend on our equipment for critical industrial operations, and therefore, every product is manufactured with strict quality standards and attention to detail.",
        "We use premium-quality materials, advanced fabrication techniques, and modern manufacturing processes to ensure superior product performance. Throughout the manufacturing journey, experienced engineers, supervisors, and quality inspectors closely monitor every stage of production.",
        "Our quality assurance process includes material verification, dimensional inspection, welding quality checks, surface finish evaluation, pressure testing, Non-Destructive Testing (NDT), and final performance verification. These detailed inspection procedures ensure that every product delivered meets the required specifications and provides reliable operation under demanding industrial conditions.",
        "Our commitment to customers does not end with product delivery. We provide complete support throughout installation, commissioning, and post-installation operations to ensure smooth system performance. Our technical experts assist customers with equipment installation, operational guidance, troubleshooting, maintenance recommendations, and process optimization whenever required.",
        "We understand that reliable after-sales support plays an important role in maximizing equipment efficiency and reducing downtime. Therefore, we maintain responsive communication channels and provide technical assistance whenever customers need support. Our goal is to help customers achieve maximum value from their investment throughout the entire lifecycle of the equipment.",
        "Innovation is another important part of our customer-centric approach. Industries are continuously evolving, and businesses require advanced solutions that improve efficiency, reduce costs, and maintain competitiveness. To support these changing requirements, we continuously invest in modern engineering technologies, improved manufacturing techniques, and process innovation.",
        "Our engineering team focuses on developing future-ready solutions that help customers enhance productivity, improve energy efficiency, reduce operational challenges, and comply with changing industry standards. By combining technical expertise with innovation, we create equipment that supports sustainable industrial growth.",
        "Transparency and trust form the foundation of our customer relationships. At G R F Dynamic Engineering, we believe that strong partnerships are built through honest communication, technical excellence, and consistent performance. We work closely with customers at every stage of the project to ensure complete understanding, clear communication, and successful execution.",
        "We consider every project as the beginning of a long-term partnership rather than a single business transaction. Our commitment is to continue supporting customers through reliable products, technical expertise, and continuous improvement. By understanding their challenges and providing effective solutions, we help businesses achieve greater efficiency and long-term success.",
        "Our customer-centric engineering approach has enabled us to build strong relationships with organizations across industries including pharmaceuticals, food and beverage, dairy processing, chemicals, oil and gas, water treatment, biotechnology, power generation, and other process-driven sectors.",
        "As we continue to expand our capabilities and strengthen our presence in the industrial engineering sector, our focus remains unchanged—to deliver reliable, innovative, and customized solutions that create lasting value for every customer we serve.",
        "Through dedication, quality, innovation, and a deep understanding of customer needs, G R F Dynamic Engineering continues to establish itself as a trusted engineering partner committed to improving industrial performance and supporting the long-term success of businesses worldwide."
      ]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      name: "Long-term Durability",
      shortDesc: "Long-term durability is one of the fundamental principles that defines every product manufactured by G R F Dynamic Engineering. We understand that industrial equipment represents...",
      fullDesc: [
        "Long-term durability is one of the fundamental principles that defines every product manufactured by G R F Dynamic Engineering. We understand that industrial equipment represents a significant investment for any organization, and customers expect systems that deliver reliable performance, operational stability, and exceptional service life for many years. Whether it is a pressure vessel, storage tank, chemical reactor, heat exchanger, mixing vessel, process skid, or any customized industrial solution, every product is designed with durability, structural strength, safety, and long-term reliability as the primary objectives.",
        "Our engineering philosophy is focused on creating equipment that continues to perform efficiently under challenging industrial conditions. Industries today operate in demanding environments where equipment is exposed to high pressure, extreme temperatures, corrosive materials, continuous production cycles, and heavy operational loads. To meet these challenges, we develop solutions that are engineered not only for immediate performance but also for dependable operation throughout the complete lifecycle of the equipment.",
        "The foundation of long-lasting equipment begins with the selection of superior-quality raw materials. At G R F Dynamic Engineering, we carefully select materials based on application requirements, process conditions, and customer specifications. We utilize premium-grade Stainless Steel SS304, SS316, SS316L, Duplex Stainless Steel, Mild Steel (MS), and other specialized industrial alloys to ensure optimum performance and durability.",
        "Each material is sourced from reliable suppliers and undergoes detailed quality verification before being approved for production. Material certificates, chemical composition analysis, mechanical property verification, and traceability records are carefully maintained to ensure complete compliance with required standards. This disciplined approach to material selection allows us to manufacture equipment that provides excellent strength, corrosion resistance, and reliability even in highly demanding operating environments.",
        "Our commitment to durability continues throughout the manufacturing process. We utilize advanced fabrication techniques, modern machinery, and skilled craftsmanship to achieve exceptional accuracy and consistency in every component. Precision cutting, CNC machining, advanced forming processes, automated welding technologies, and controlled fabrication methods ensure that each part is manufactured according to exact engineering requirements.",
        "Critical components such as pressure-retaining sections, weld joints, structural supports, flanges, nozzles, and assembly connections receive special attention during fabrication. These components directly influence equipment strength and operational reliability, and therefore, they are manufactured using qualified procedures and inspected carefully throughout production.",
        "Our experienced engineers, supervisors, welders, and quality professionals work together to maintain strict control over every manufacturing stage. By combining technical expertise with advanced production methods, we ensure that every product achieves the required mechanical strength, dimensional accuracy, and structural integrity.",
        "Surface protection and finishing processes also play an important role in improving equipment durability. Industrial equipment often operates in environments where corrosion, chemical exposure, moisture, abrasion, and contamination can affect performance over time. To overcome these challenges, we provide advanced surface treatment solutions based on specific application requirements.",
        "Our finishing capabilities include internal mirror polishing, mechanical polishing, chemical passivation, protective coating systems, and specialized surface treatments designed to enhance corrosion resistance and maintain equipment quality. For industries such as pharmaceuticals, dairy, and food processing, smooth hygienic surfaces help prevent contamination and improve cleaning efficiency. For chemical and heavy industrial applications, protective treatments help increase resistance against aggressive chemicals and environmental conditions.",
        "These advanced finishing processes not only improve equipment appearance but also contribute significantly to extending operational life. By reducing corrosion, minimizing surface damage, and protecting critical areas, we help customers achieve better performance and lower maintenance requirements over extended periods.",
        "Quality assurance and testing are essential components of our durability commitment. Before any equipment leaves our facility, it undergoes comprehensive inspection and testing procedures to verify its performance, reliability, and safety. Our quality control process includes dimensional verification, visual inspection, weld quality assessment, material verification, Non-Destructive Testing (NDT), hydrostatic pressure testing, pneumatic leak testing, vacuum testing where required, and final performance evaluation.",
        "These testing procedures help identify potential weaknesses or defects before delivery. By ensuring that every product meets strict quality requirements, we reduce the possibility of operational failures and provide customers with equipment they can depend on for long-term use.",
        "Our engineering team designs equipment with real-world operating conditions in mind. Every system is developed to withstand continuous industrial operation, varying pressures, temperature fluctuations, chemical exposure, vibration, and demanding production schedules. Through detailed engineering analysis and practical experience, we create equipment that maintains performance even in challenging environments.",
        "Equipment manufactured by G R F Dynamic Engineering is designed to support industries where reliability is critical. From pharmaceutical manufacturing and dairy processing to food and beverage production, chemical plants, oil and gas facilities, water treatment systems, and power generation industries, our solutions provide consistent performance and operational confidence.",
        "Long-term durability provides significant advantages to customers by reducing maintenance costs, minimizing production interruptions, extending replacement cycles, and improving overall return on investment. Equipment that performs reliably over many years allows businesses to focus on productivity and growth without frequent concerns related to repairs or unexpected downtime.",
        "At G R F Dynamic Engineering, durability is not simply a product feature—it is a promise of engineering excellence and customer commitment. We believe that every product we deliver should represent strength, reliability, and lasting value. By combining premium materials, advanced manufacturing technologies, skilled workmanship, strict quality control, and continuous improvement, we create industrial equipment built to perform for generations.",
        "Our dedication to long-term durability reflects our commitment to supporting customers with solutions that provide dependable performance, improved efficiency, and reduced lifecycle costs. Through innovation, precision engineering, and uncompromising quality standards, we continue to build trusted partnerships with industries that require reliable equipment capable of standing the test of time.",
        "G R F Dynamic Engineering remains committed to delivering industrial solutions that combine durability, safety, and performance—helping businesses achieve sustainable growth and operational excellence through equipment they can trust."
      ]
    }
  ];

  const differentiators = [
    {
      number: "01",
      title: "ASME & ISO Standards",
      desc: "Welders certified under ASME Section IX and equipment designed to ASME Section VIII & API 650 codes."
    },
    {
      number: "02",
      title: "800+ Installation Track Record",
      desc: "Over 800 process tanks, silos, and reactors operational across dairy, chemical, and pharmaceutical plants nationwide."
    },
    {
      number: "03",
      title: "In-House 50 Bar Hydro Testing",
      desc: "Comprehensive non-destructive testing (NDT), radiography, and 50 Bar hydro testing facilities under one roof."
    },
    {
      number: "04",
      title: "Sanitary Mirror Finish (Ra < 0.4μm)",
      desc: "Specialized internal polishing machinery delivering ultra-smooth hygienic surfaces for food, beverage, and pharma."
    },
    {
      number: "05",
      title: "End-to-End Turnkey Execution",
      desc: "From initial 3D CAD stress simulation to plate rolling, welding, testing, and site logistics."
    },
    {
      number: "06",
      title: "17+ Years Technical Leadership",
      desc: "Guided by founder expertise in heavy engineering, technical design, quality assurance, and project management."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-charcoal text-white pb-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* Page Header */}
        <div className="mb-14 text-left">
          <span className="text-[10px] sm:text-xs font-mono text-brand-accent uppercase tracking-widest block font-bold">
            // WHY CHOOSE GRF DYNAMIC ENGINEERING
          </span>
          <h1 className="heading-font text-3xl sm:text-5xl font-extrabold text-white mt-3 uppercase tracking-wide">
            Why Choose Us
          </h1>
          <div className="text-slate-400 text-sm sm:text-base max-w-3xl mt-3 font-light leading-relaxed space-y-4">
            <p>
              At G R F Dynamic Engineering, we are committed to delivering high-quality custom manufacturing solutions that meet the evolving needs of modern industries. As a trusted engineering partner in North India, we specialize in designing, manufacturing, and delivering high-integrity process equipment, pressure vessels, industrial storage tanks, and customized engineering solutions built for reliability, safety, and long-term performance.
            </p>
            {isIntroExpanded && (
              <>
                <p>
                  Our strength lies in combining advanced engineering expertise, skilled manufacturing capabilities, modern technologies, and a customer-focused approach. We understand that every industrial application has unique challenges, and therefore, we focus on providing customized solutions that are precisely designed according to specific process requirements, operational conditions, and industry standards.
                </p>
                <p>
                  One of the key reasons customers choose G R F Dynamic Engineering is our commitment to engineering excellence. Our experienced engineers and technical professionals carefully analyze each project from the initial design stage to final execution. By using advanced CAD modeling, detailed engineering calculations, and practical manufacturing knowledge, we develop equipment that delivers optimum performance, structural reliability, and operational efficiency.
                </p>
                <p>
                  We specialize in manufacturing high-integrity industrial equipment including pressure vessels, storage tanks, reactors, heat exchangers, process skids, and other customized fabrication solutions. Every product is manufactured with careful attention to material selection, dimensional accuracy, welding quality, surface finishing, and performance requirements. Our focus on precision engineering ensures that every system meets customer expectations and performs reliably in demanding industrial environments.
                </p>
                <p>
                  Quality is at the core of our manufacturing philosophy. We follow strict quality control procedures throughout every stage of production, from raw material inspection and fabrication to testing and final delivery. Our in-house inspection capabilities include dimensional verification, weld inspection, Non-Destructive Testing (NDT), hydrostatic testing, pneumatic testing, and surface quality checks. These processes ensure that every product meets the required safety, durability, and performance standards.
                </p>
                <p>
                  Our skilled workforce is another major advantage that sets us apart. Supported by experienced engineers, supervisors, welders, fitters, machinists, polishers, and technical professionals, we have the expertise required to handle complex industrial manufacturing requirements. Our team's practical experience and dedication allow us to deliver consistent quality while maintaining efficiency and reliability throughout every project.
                </p>
                <p>
                  We also focus strongly on innovation and continuous improvement. By adopting modern manufacturing technologies, advanced fabrication methods, and improved engineering practices, we continuously enhance our capabilities. Our goal is to provide customers with future-ready solutions that improve productivity, reduce operational challenges, and deliver long-term value.
                </p>
                <p>
                  Safety is an essential part of our work culture. We design and manufacture equipment with safety integrated into every stage of the process. From material selection and engineering design to fabrication, testing, and installation, we follow strict safety practices to ensure reliable operation and protection of personnel and assets.
                </p>
                <p>
                  Customer satisfaction is the foundation of our long-term relationships. We believe in understanding customer requirements, providing transparent communication, and delivering solutions that exceed expectations. Our support extends beyond manufacturing through installation assistance, technical guidance, and after-sales support to ensure smooth operation throughout the equipment lifecycle.
                </p>
                <p>
                  Located in North India, G R F Dynamic Engineering combines local manufacturing expertise with global quality standards. We take pride in supporting industries such as pharmaceuticals, food and beverage, dairy, chemicals, oil and gas, water treatment, power generation, and other process-driven sectors with dependable engineering solutions.
                </p>
                <p>
                  Choosing G R F Dynamic Engineering means partnering with an organization that values quality, precision, reliability, and customer success. Through advanced engineering, skilled craftsmanship, strict quality practices, and a commitment to excellence, we continue to build industrial solutions that help businesses improve efficiency, enhance productivity, and achieve sustainable growth.
                </p>
              </>
            )}
          </div>
          <div className="pt-3">
            <button
              onClick={() => setIsIntroExpanded(!isIntroExpanded)}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-brand-accent hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
            >
              {isIntroExpanded ? 'View Less -' : 'View More +'}
            </button>
          </div>
          <div className="h-0.5 w-16 bg-brand-accent mt-5"></div>
        </div>

        {/* Mission & Vision Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24 items-start">
          {/* Mission */}
          <div className="bg-[#0a0d18]/60 p-7 sm:p-9 rounded-sm border border-white/5 border-l-[4px] border-l-brand-accent hover:border-brand-accent/40 transition-all duration-300 relative group overflow-hidden shadow-2xl space-y-5 flex flex-col">
            <div className="absolute top-0 right-0 border-t-2 border-r-2 border-brand-accent/20 w-10 h-10 group-hover:border-brand-accent/50 transition-colors"></div>
            <div className="flex items-center gap-4 mb-2">
              <div className="bg-brand-accent/10 p-3 rounded-sm text-brand-accent border border-brand-accent/20">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <span className="text-[9px] font-mono text-brand-accent uppercase tracking-widest block font-bold">OUR CORE PURPOSE</span>
                <h2 className="heading-font text-xl sm:text-2xl text-white font-bold uppercase tracking-wider">
                  Our Mission
                </h2>
              </div>
            </div>

            <div className="space-y-4 text-slate-300 text-xs sm:text-sm leading-relaxed font-light flex-grow">
              <p>
                At G R F Dynamic Engineering, our mission is to design, manufacture, and install exceptionally reliable industrial equipment that enables businesses to achieve maximum operational efficiency while maintaining the highest standards of quality, safety, performance, and sustainability. We are committed to delivering innovative engineering solutions that support the evolving requirements of modern industries and help organizations achieve greater productivity, improved processes, and long-term operational success.
              </p>
              {isMissionExpanded && (
                <>
                  <p>
                    With a strong foundation in engineering excellence and manufacturing expertise, we aim to become a trusted partner for industries requiring high-performance process equipment and customized engineering solutions. Our mission is driven by a commitment to understanding the unique challenges faced by our customers and providing solutions that are technically advanced, economically efficient, and built for dependable performance in demanding industrial environments.
                  </p>
                  <p>
                    We serve a wide range of process-driven industries, including pharmaceuticals, food and beverage, chemicals, oil and gas, water treatment, power generation, and other specialized manufacturing sectors. Each industry has unique operational requirements, and our objective is to develop equipment that meets these specific needs while ensuring superior functionality, safety, reliability, and process compliance.
                  </p>
                  <p>
                    Precision and quality are at the core of everything we manufacture. We believe that industrial equipment should not simply meet basic requirements but should exceed expectations in terms of efficiency, durability, performance, and compliance. Our engineering processes are guided by internationally recognized standards and industry best practices, allowing us to manufacture systems that fulfill demanding sanitary, hygienic, and pressure equipment requirements.
                  </p>
                  <p>
                    By using high-quality materials, advanced manufacturing technologies, and strict quality control procedures, we ensure that every product leaving our facility delivers consistent performance throughout its operational life. Our focus on precision manufacturing helps reduce maintenance requirements, minimize downtime, and extend equipment lifespan, providing customers with reliable solutions that support continuous production and improved profitability.
                  </p>
                  <p>
                    Innovation plays a central role in our mission. We continuously focus on improving our engineering capabilities by adopting modern technologies, advanced design methods, and efficient manufacturing practices. Our team works closely with customers to understand their process requirements and develop customized solutions that improve workflow efficiency and operational performance.
                  </p>
                  <p>
                    Whether it involves designing complex processing systems, manufacturing pressure vessels, developing customized industrial equipment, or executing complete turnkey installation projects, we aim to provide solutions that simplify operations and enhance productivity. Through continuous improvement and technical innovation, we strive to stay ahead of industry developments and deliver engineering solutions that meet future challenges.
                  </p>
                  <p>
                    Safety is one of our highest priorities and an essential part of our mission. We are committed to designing and manufacturing equipment that ensures safe operation, protects personnel, minimizes environmental impact, and complies with applicable industry regulations. Every stage of our process is carefully managed with safety considerations, from engineering design and material selection to fabrication, testing, installation, and final commissioning.
                  </p>
                  <p>
                    Our quality and safety-focused approach ensures that every product is built to perform reliably under challenging operating conditions. Through advanced inspection methods, testing procedures, and skilled technical expertise, we verify that our equipment meets the highest standards of structural integrity and operational safety.
                  </p>
                  <p>
                    At G R F Dynamic Engineering, we believe that customer satisfaction is the foundation of long-term success. Our mission extends beyond delivering products; we aim to create lasting relationships through trust, transparency, technical excellence, and dedicated support. We work closely with our customers throughout every stage of the project to ensure that their expectations are fully understood and successfully achieved.
                  </p>
                  <p>
                    Our commitment continues even after project completion through comprehensive installation assistance, technical guidance, maintenance support, and responsive after-sales service. We believe that strong customer relationships are built through consistent performance, reliable communication, and a commitment to delivering solutions that create long-term value.
                  </p>
                  <p>
                    Environmental responsibility and sustainability are also important aspects of our mission. We continuously work toward developing energy-efficient solutions, optimizing manufacturing processes, and supporting industries in achieving more sustainable operations. By focusing on efficiency, durability, and responsible engineering practices, we contribute to creating solutions that benefit both businesses and the environment.
                  </p>
                  <p>
                    Our skilled workforce, including experienced engineers, supervisors, welders, fabricators, polishers, and technical professionals, plays a vital role in achieving our mission. Their expertise, dedication, and commitment to quality enable us to handle complex engineering challenges and deliver products that meet the highest expectations. Through continuous training and professional development, we ensure that our team remains prepared to adopt new technologies and manufacturing techniques.
                  </p>
                  <p>
                    Ultimately, our mission is to establish G R F Dynamic Engineering as a globally trusted name in industrial engineering by providing dependable, high-performance equipment and customized solutions that empower industries to operate more efficiently and safely. We are dedicated to creating products that combine innovation, precision, durability, and engineering excellence.
                  </p>
                  <p>
                    Through integrity, continuous improvement, and an unwavering commitment to quality, we aim to support the growth and success of every organization we serve. Our mission is not only to manufacture industrial equipment but to deliver solutions that improve productivity, enhance safety, optimize processes, and create lasting value for our customers for years to come.
                  </p>
                </>
              )}
            </div>

            <div className="pt-2 text-left">
              <button
                onClick={() => setIsMissionExpanded(!isMissionExpanded)}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-brand-accent hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
              >
                {isMissionExpanded ? 'View Less -' : 'View More +'}
              </button>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-[#0a0d18]/50 p-7 sm:p-9 rounded-sm border border-white/5 border-r-[4px] border-r-blue-500 hover:border-blue-500/40 transition-all duration-300 relative group overflow-hidden shadow-2xl space-y-5 flex flex-col">
            <div className="absolute bottom-0 left-0 border-b-2 border-l-2 border-blue-500/20 w-10 h-10 group-hover:border-blue-500/50 transition-colors"></div>
            <div className="flex items-center gap-4 mb-2">
              <div className="bg-blue-500/10 p-3 rounded-sm text-blue-400 border border-blue-500/20">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <span className="text-[9px] font-mono text-blue-400 uppercase tracking-widest block font-bold">OUR FUTURE HORIZON</span>
                <h2 className="heading-font text-xl sm:text-2xl text-white font-bold uppercase tracking-wider">
                  Our Vision
                </h2>
              </div>
            </div>

            <div className="space-y-4 text-slate-300 text-xs sm:text-sm leading-relaxed font-light flex-grow text-left">
              <p>
                At G R F Dynamic Engineering, our vision is to become one of India's most trusted and respected engineering partners for designing, manufacturing, and delivering advanced custom industrial systems that establish new benchmarks in quality, innovation, reliability, and performance. We aim to be recognized as a preferred choice for industries that require dependable engineering solutions, precision manufacturing capabilities, and equipment designed to meet the highest standards of operational excellence.
              </p>
              {isVisionExpanded && (
                <>
                  <p>
                    Our vision is built around the belief that successful engineering is not only about manufacturing products but also about creating solutions that improve industrial performance, enhance productivity, and support long-term business growth. We aspire to develop industrial systems that help organizations achieve greater efficiency, reduce operational challenges, and maintain consistent performance even under the most demanding working conditions.
                  </p>
                  <p>
                    Through continuous improvement, technical excellence, and customer-focused innovation, we aim to strengthen our presence across Indian and global markets. Our goal is to establish G R F Dynamic Engineering as a symbol of trust, reliability, and engineering expertise by consistently delivering solutions that exceed customer expectations and create meaningful value for every project we undertake.
                  </p>
                  <p>
                    Innovation is the foundation of our future growth. We envision ourselves at the forefront of industrial manufacturing by adopting advanced technologies, modern engineering practices, and intelligent production methods. Our focus is to continuously improve capabilities in areas such as shell welding automation, precision fabrication, advanced forming processes, sanitary surface finishing, and customized industrial equipment manufacturing.
                  </p>
                  <p>
                    By integrating automation, robotics, digital manufacturing technologies, and advanced design methodologies, we aim to improve production efficiency, enhance product consistency, reduce manufacturing timelines, and deliver superior-quality equipment. We believe that technological advancement is essential for meeting the rapidly changing requirements of modern industries, and we continuously work toward developing innovative solutions that provide better performance and reliability.
                  </p>
                  <p>
                    Our vision includes becoming a leader in providing customized engineering solutions for industries such as pharmaceuticals, food processing, dairy, chemicals, biotechnology, water treatment, oil and gas, power generation, and other process-based sectors. Each industry has unique operational requirements, and we aim to deliver solutions that are specifically designed to improve efficiency, safety, hygiene, and overall process performance.
                  </p>
                  <p>
                    Quality and compliance remain at the center of our vision. We are committed to manufacturing equipment that meets the highest national and international standards for safety, pressure handling, hygiene, durability, and environmental responsibility. Every system we design and manufacture reflects our dedication to precision engineering, superior workmanship, and strict quality control.
                  </p>
                  <p>
                    Our vision is to create a manufacturing environment where every product represents engineering excellence and reliability. Through careful material selection, advanced fabrication techniques, skilled manpower, and comprehensive testing procedures, we ensure that our equipment delivers dependable performance throughout its operational life.
                  </p>
                  <p>
                    We believe that long-term success is built on trust, consistency, and commitment to quality. Therefore, our vision extends beyond delivering industrial equipment; we aim to build strong and lasting partnerships with our customers. By understanding their challenges, supporting their objectives, and providing technically advanced solutions, we strive to become a reliable engineering partner that contributes to their continued growth and success.
                  </p>
                  <p>
                    While expanding our capabilities and exploring global opportunities, we remain strongly connected to our roots and values. Based in Saharanpur, we take pride in contributing to regional industrial development by creating employment opportunities, supporting skilled workforce development, and promoting advanced manufacturing practices.
                  </p>
                  <p>
                    We believe that world-class engineering capabilities can be developed through strong local foundations. Our vision is to combine local expertise, skilled craftsmanship, and modern technology to create products that compete successfully in national and international markets. By investing in people, technology, and infrastructure, we aim to strengthen our manufacturing capabilities while maintaining the values and principles that define our organization.
                  </p>
                  <p>
                    Environmental responsibility is also an important part of our future vision. We aim to support sustainable industrial growth by developing efficient equipment, optimizing manufacturing processes, and encouraging responsible engineering practices. Our focus is to create solutions that not only improve business performance but also contribute toward safer and more sustainable industrial operations.
                  </p>
                  <p>
                    Employee growth and continuous learning are key elements of our vision. We believe that a skilled and motivated workforce is the driving force behind innovation and excellence. By encouraging professional development, technical training, and knowledge sharing, we aim to build a team capable of handling complex engineering challenges and delivering exceptional results.
                  </p>
                  <p>
                    Our long-term vision is to create an organization where innovation, quality, safety, and customer satisfaction remain the foundation of every decision. We aim to continuously improve our processes, expand our technical capabilities, and adapt to emerging industry trends to remain competitive in a rapidly evolving engineering landscape.
                  </p>
                  <p>
                    Ultimately, G R F Dynamic Engineering envisions becoming a globally respected engineering organization recognized for innovation, precision, reliability, and trust. We aim to deliver advanced industrial systems that empower industries, improve operational efficiency, support technological progress, and create lasting value for our customers, employees, partners, and the communities we proudly serve.
                  </p>
                  <p>
                    Through dedication, integrity, continuous improvement, and a commitment to engineering excellence, we are working toward building a future where G R F Dynamic Engineering stands as a benchmark of quality and innovation in the global industrial engineering sector.
                  </p>
                </>
              )}
            </div>

            <div className="pt-2 text-left">
              <button
                onClick={() => setIsVisionExpanded(!isVisionExpanded)}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-400 hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
              >
                {isVisionExpanded ? 'View Less -' : 'View More +'}
              </button>
            </div>
          </div>
        </section>

        {/* Our Core Values Grid */}
        <section className="mb-24">
          <div className="mb-10 text-left">
            <span className="text-[10px] font-mono text-brand-accent uppercase tracking-widest block">// QUALITY INTEGRITY</span>
            <h2 className="heading-font text-2xl sm:text-3xl text-white font-bold uppercase mt-1">
              Our Core Values
            </h2>
            <div className="h-px bg-white/[0.04] w-full mt-3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {values.map((val, index) => {
              const isExpanded = expandedValues[index];
              return (
                <div
                  key={index}
                  className="bg-[#0a0d18]/50 p-6 sm:p-8 rounded-sm border border-white/5 hover:border-brand-accent/30 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/5 rounded-full blur-2xl group-hover:bg-brand-accent/10 transition-colors pointer-events-none"></div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3.5 mb-2">
                      <div className="p-2.5 rounded-sm bg-brand-accent/10 text-brand-accent border border-brand-accent/20 group-hover:scale-110 transition-transform shrink-0">
                        {val.icon}
                      </div>
                      <h3 className="heading-font text-white group-hover:text-brand-accent font-bold text-base sm:text-lg uppercase tracking-wide transition-colors">
                        {val.name}
                      </h3>
                    </div>

                    <div className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light space-y-4">
                      {isExpanded ? (
                        Array.isArray(val.fullDesc) ? (
                          val.fullDesc.map((paragraph, pIdx) => (
                            <p key={pIdx}>{paragraph}</p>
                          ))
                        ) : (
                          <p>{val.fullDesc}</p>
                        )
                      ) : (
                        <p>{val.shortDesc}</p>
                      )}
                    </div>

                    <button
                      onClick={() => toggleValueExpand(index)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-brand-accent hover:text-white uppercase tracking-wider transition-colors pt-1 cursor-pointer"
                    >
                      {isExpanded ? 'View Less -' : 'View More +'}
                    </button>
                  </div>

                  <div className="pt-4 mt-6 border-t border-white/[0.03] flex items-center justify-between text-[9px] font-mono text-slate-500">
                    <span>GRF VALUE PILLAR 0{index + 1}</span>
                    <span className="text-brand-accent">● VERIFIED STANDARD</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Key Differentiators Section */}
        <section className="mb-24 bg-[#0a0d18]/70 border border-white/10 rounded-sm p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none"></div>

          <div className="mb-12 text-left relative z-10">
            <span className="text-[10px] font-mono text-brand-accent uppercase tracking-widest block">// COMPETITIVE EDGE</span>
            <h2 className="heading-font text-2xl sm:text-3xl text-white font-bold uppercase mt-1">
              What Sets Us Apart
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 font-light">
              6 reasons why leading chemical, dairy, and pharmaceutical companies partner with GRF Dynamic Engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {differentiators.map((item) => (
              <div
                key={item.number}
                className="bg-brand-charcoal/80 p-6 rounded-sm border border-white/5 hover:border-brand-accent/30 transition-all duration-300 relative group"
              >
                <div className="text-2xl font-mono font-extrabold text-brand-accent/40 group-hover:text-brand-accent transition-colors mb-3">
                  [{item.number}]
                </div>
                <h3 className="heading-font text-white font-bold text-sm sm:text-base uppercase tracking-wider mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="bg-gradient-to-r from-brand-accent/20 via-brand-obsidian to-blue-600/20 border border-brand-accent/30 rounded-sm p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <span className="text-[10px] font-mono text-brand-accent uppercase tracking-widest block font-bold">
              // READY TO START YOUR CUSTOM FABRICATION PROJECT?
            </span>
            <h2 className="heading-font text-2xl sm:text-4xl text-white font-extrabold uppercase tracking-wide">
              Partner With GRF Dynamic Engineering Today
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
              Consult with our engineering team for technical drawing reviews, ASME compliance checks, or custom vessel manufacturing quotes.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-brand-accent to-blue-600 hover:brightness-110 text-white px-8 py-3.5 rounded-sm font-bold uppercase text-xs sm:text-sm tracking-wider transition-all duration-200 shadow-lg shadow-brand-accent/20"
              >
                Request Custom Quote
              </Link>
              <Link
                to="/products"
                className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-sm font-bold uppercase text-xs sm:text-sm tracking-wider transition-all duration-200"
              >
                Explore Products Catalog
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
