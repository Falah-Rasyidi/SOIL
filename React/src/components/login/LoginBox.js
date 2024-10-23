import { motion } from "framer-motion";

import { Login } from "../login";

/**
 *
 * @param {*} props
 * @returns {jsx} for modal user login box
 */
const LoginBox = (props) => {
  // isOpen is true or false state, handleClose is a function that changes isOpen to false.
  const { handleClose, isOpen } = props;
  return (
    <motion.div
      onClick={handleClose}
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.7,
        },
      }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="dropin-box"
        initial={{ y: -500, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            duration: 10,
            type: "spring",
            damping: 40,
            stiffness: 250,
          },
        }}
        exit={{ y: -500, opacity: 0 }}
      >
        <Login loginBoxOpen={isOpen} closeLoginBox={handleClose} />
      </motion.div>
    </motion.div>
  );
};

export default LoginBox;
