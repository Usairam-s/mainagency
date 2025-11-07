import Title from "./Title";
import { teamData } from "../assets/assets";
import { motion } from "motion/react";
const Teams = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-800 dark:text-white"
    >
      <Title
        title="Meet the team"
        desc="The people who design, develop, and automate your brand’s online growth."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-6xl">
        {teamData.map((data, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            key={index}
            className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl shadow-gray-100 dark:shadow-white/5 hover:scale-105 transition-all duration-300"
          >
            <img
              src={data.image}
              alt={data.name}
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
            />
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                {data.name}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                {data.title}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {data.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Teams;
