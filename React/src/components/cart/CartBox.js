import { motion } from "framer-motion";

import { Cart } from "../cart";
/**
 *
 * @param {*} props
 * @returns {jsx} for modal shopping cart box
 */
const CartBox = (props) => {
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
        style={{ backgroundColor: "#fff" }}
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
        <Cart cartBoxOpen={isOpen} closeCartBox={handleClose} />
      </motion.div>
    </motion.div>
  );
};

export default CartBox;
