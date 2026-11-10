import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./App.css";

import firstPage from "./assets/images/first-page1.jpeg";
import childLeft from "./assets/images/child-left.jpeg";
import childRight from "./assets/images/child-right.jpeg";
import confetti from "canvas-confetti";

const flowerShape = confetti.shapeFromText({
  text: "🌸",
  scalar: 1.4,
});

const heartShape = confetti.shapeFromText({
  text: "❤️",
  scalar: 1.3,
});

const textReveal = {
  hidden: {
    opacity: 0,
    y: -10,
    filter: "blur(5px)",
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 5,
      ease: [0.5, 1, 0.35, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(5px)",
    transition: { duration: 1.2 },
    ease: "easeInOut",
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 2 },
    ease: "easeInOut",
  },
};

const firstPageReveal = {
  hidden: {
    transition: {
      staggerChildren: 0.25,
      staggerDirection: -1,
    },
  },
  visible: {
    transition: {
      delayChildren: 0.5,
      staggerChildren: 1.5,
    },
  },
};

const secondPageReveal = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.6,
    },
  },
};

export default function App() {
  const [opened, setOpened] = useState(false);
  const [closing, setClosing] = useState(false);
  const [showText, setShowText] = useState(false);

  const celebrationPlayedRef = useRef(false);
  const audioRef = useRef(null);
  const cardRef = useRef(null);
  const textTimerRef = useRef(null);
  const closeTimerRef = useRef(null);

  const playCelebration = () => {
    if (celebrationPlayedRef.current) return;

    celebrationPlayedRef.current = true;

    const settings = {
      particleCount: 45,
      spread: 120,
      startVelocity: 20,
      gravity: 0.25,
      ticks: 600,
      scalar: 1.2,
      shapes: [flowerShape, heartShape],
      colors: ["#E8A0B5", "#FFFFFF", "#B18A4A", "#D94B65"],
      zIndex: 100,
    };

    confetti({
      ...settings,
      origin: { x: 0.2, y: 0.55 },
    });

    confetti({
      ...settings,
      origin: { x: 0.8, y: 0.55 },
    });
  };

  const toggleInvitation = async () => {
    if (closing) return;

    if (opened) {
      clearTimeout(textTimerRef.current);

      setShowText(false);

      celebrationPlayedRef.current = false;
      confetti.reset();

      setClosing(true);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      closeTimerRef.current = setTimeout(() => {
        setOpened(false);
        setClosing(false);

        if (cardRef.current) {
          cardRef.current.scrollTop = 0;
        }
      }, 1000);

      return;
    }

    setOpened(true);

    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
      } catch (error) {
        console.log("Music playback requires another tap.");
      }
    }

    clearTimeout(textTimerRef.current);

    textTimerRef.current = setTimeout(() => {
      setShowText(true);
    }, 2400);
  };

  return (
    <main className="page">

      <audio
        ref={audioRef}
        src="/Wedding.mpeg"
        loop
      />

      <div className={`scene ${opened || closing ? "is-open" : ""}`}>

        {/* INVITATION CARD */}

        <motion.div
          className="card"
          ref={cardRef}
          initial={false}
          animate={{
            opacity: 1,
            y: opened ? -45 : 0,
            scale: 1,
          }}
          transition={{
            y: {
              duration: 1.8,
              delay: 0.6,
              ease: "easeInOut",
            },
            opacity: {
              duration: 0.5,
            },
            scale: {
              duration: 0.5,
            },
          }}
        >

          <img
            src={firstPage}
            alt="Wedding invitation floral background"
            className="first-page-image"
          />

          <div className="card-border">
            <AnimatePresence mode="sync">
              {showText && (
                <motion.section
                  className="first-content"
                  variants={firstPageReveal}
                  initial="hidden"
                  animate={showText ? "visible" : "hidden"}
                  onAnimationComplete={(definition) => {
                    if (definition === "visible") {
                      playCelebration();
                    }
                  }}
                >

                  <motion.p
                    className="bismillah"
                    variants={textReveal}
                  >
                    باسمه تعالی
                  </motion.p>

                  <motion.p
                    className="small-title"
                    variants={textReveal}
                  >
                    TOGETHER
                    <br />
                    WITH THEIR FAMILIES
                  </motion.p>

                  <motion.h1 variants={textReveal}>
                    MUBASHER AHMAD ARYAN
                  </motion.h1>

                  <motion.p
                    className="and"
                    variants={fadeIn}
                  >
                    🤎 — AND — 🤎
                  </motion.p>

                  <motion.h2 variants={textReveal}>
                    HENA BREEN
                  </motion.h2>

                  <motion.p
                    className="love-quote"
                    variants={textReveal}
                  >
                    INVITE YOU TO CELEBRATE
                    <br />
                    THE WEDDING
                  </motion.p>

                  <motion.div
                    className="date"
                    variants={fadeIn}
                  >

                    <span className="date-day">
                      SUNDAY
                    </span>

                    <div className="date-center">
                      <small>NOV</small>
                      <strong>18</strong>
                      <small>2026</small>
                    </div>

                    <span className="date-time">
                      AT 18:00
                    </span>

                  </motion.div>

                  <motion.p
                    className="address"
                    variants={textReveal}
                  >
                    The Royal Bakhtar Banqueting Hall
                    <br />
                    368 Station Rd, Harrow HA1 2DE, London
                  </motion.p>

                  <motion.p
                    className="inshallah"
                    variants={fadeIn}
                  >
                    Insha Allah
                  </motion.p>

                  {/* SECOND SECTION */}

                  <motion.div
                    className="second-page-section"
                    variants={secondPageReveal}
                  >

                    <motion.div
                      className="children-request"
                      variants={textReveal}
                    >

                      <motion.h3 variants={textReveal}>
                        🤎 A POLITE AND HUMBLE REQUEST 🤎
                      </motion.h3>

                      <motion.div
                        className="request-content"
                        variants={secondPageReveal}
                      >


                        <motion.div
                          className="request-copy"
                          variants={fadeIn}
                        >

                          <motion.p variants={fadeIn}>
                            As much as we adore your little ones,
                            our wedding will be an{" "}
                            <strong>ADULT-ONLY</strong> celebration.
                          </motion.p>

                          <motion.p
                            className="funny-text"
                            variants={fadeIn}
                          >
                            Please take this as an excuse for a kids-free night out!
                        
                          </motion.p>

                          <motion.p
                            className="adults-only"
                            variants={textReveal}
                          ><span>2</span> SEATS HAVE BEEN RESERVED IN YOUR HONOUR
                          
                          </motion.p>
                          
                          <motion.p variants={fadeIn}>
                            Thank you for being part of our celebration!
                          </motion.p>


                        </motion.div>

                      </motion.div>

                    </motion.div>

                  </motion.div>

                </motion.section>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

        {/* ENVELOPE */}

        <motion.div
          className="envelope"
          animate={{
            opacity: opened ? 0 : 1,
          }}
          transition={{
            opacity: {
              duration: 0.8,
              delay: 2.2,
              ease: "easeInOut",
            },
          }}
        >

          <div className="envelope-back" />

          <motion.div
            className="envelope-flap"
            animate={{
              rotateX: opened ? -180 : 0,
            }}
            transition={{
              duration: 2.5,
              delay: 0,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >

            <motion.div
              className="seal"
              animate={{
                opacity: opened ? 0 : 1,
                scale: opened ? 0.7 : 1,
              }}
              transition={{
                duration: 0.8,
              }}
            >
              M ♥ H
            </motion.div>

          </motion.div>

          <div className="envelope-front">

            <div className="monogram">
              <span>M</span>
              <i />
              <span>H</span>
            </div>

            <div className="flower">❀</div>

            <p className="envelope-title">
              OUR WEDDING
            </p>

          </div>

        </motion.div>

      </div>

      {/* OPEN / CLOSE BUTTON */}

      <motion.button
        className="open-button"
        type="button"
        onClick={toggleInvitation}
        disabled={closing}
        whileHover={{ y: -3, scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
      >
        {opened || closing
          ? "Close Invitation ♡"
          : "Open Invitation ♡"}
      </motion.button>

    </main>
  );
}