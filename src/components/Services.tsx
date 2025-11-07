import assets from "../assets/assets";
import ServiceCard from "./ServiceCard";
import Title from "./Title";
import { motion } from "motion/react";
const Services = () => {
  const servicesData = [
    {
      title: "Website Design & Development",
      desc: "We design and build stunning, conversion-focused websites that load fast, look great on every device, and reflect your brand’s true personality.",
      icon: assets.ads_icon,
    },
    {
      title: "Brand Identity & Digital Presence",
      desc: "We craft digital identities that make your business unforgettable from visuals and messaging to online positioning.",
      icon: assets.marketing_icon,
    },
    {
      title: "SEO & Performance Optimization",
      desc: "We make sure your website doesn’t just exist, but performs, ranking higher, loading faster, and attracting the right audience.",
      icon: assets.content_icon,
    },
    {
      title: "Social Media Automation & Marketing",
      desc: "We power your social media with smart automation that learns, posts, and adapts so you stay ahead without lifting a finger",
      icon: assets.social_icon,
    },
  ];
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      transition={{ staggerChildren: 0.2 }}
      viewport={{ once: true }}
      id="services"
      className="relative flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white"
    >
      <img
        src={assets.bgImage2}
        alt="bg-image"
        className="absolute -top-110 -left-70 -z-1 dark:hidden"
      />

      <Title
        title="How can we help?"
        desc="Your business deserves more than just a website it deserves a digital identity that speaks, sells, and scales."
      />

      <div className="flex flex-col md:grid grid-cols-2">
        {servicesData.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default Services;
