"use client"

import { motion } from "framer-motion"
import { Shield, Users, Award, Target, Star } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Marshal Jake Thompson",
      role: "Chief Security Officer",
      description: "Former bounty hunter turned crypto sheriff, protecting digital frontiers since 2015.",
      bounty: "$50,000",
    },
    {
      name: "Deputy Sarah Mitchell",
      role: "Lead Blockchain Detective",
      description: "Tracks down the most elusive smart contract vulnerabilities across the wild west of DeFi.",
      bounty: "$35,000",
    },
    {
      name: "Sheriff Mike Rodriguez",
      role: "Head of Operations",
      description: "Keeps the peace in our digital saloon, ensuring every transaction is safer than Fort Knox.",
      bounty: "$40,000",
    },
  ]

  const achievements = [
    { icon: Shield, title: "10,000+", subtitle: "Contracts Secured" },
    { icon: Users, title: "500+", subtitle: "Satisfied Clients" },
    { icon: Award, title: "99.9%", subtitle: "Success Rate" },
    { icon: Target, title: "$2B+", subtitle: "Assets Protected" },
  ]

  return (
    <div className="newspaper-container">
      <div className="newspaper-page">
        {/* Newspaper Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="newspaper-header"
        >
          <div className="header-ornament top"></div>
          <h1 className="newspaper-title">THE TXSHIELD GAZETTE</h1>
          <div className="newspaper-subtitle">
            <span className="date">ESTABLISHED 2020</span>
            <span className="price">PRICE: 5¢</span>
            <span className="edition">SPECIAL EDITION</span>
          </div>
          <div className="header-ornament bottom"></div>
        </motion.header>

        {/* Main Headline */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="main-headline"
        >
          <h2 className="headline-text">LEGENDARY CRYPTO SHERIFFS TAME THE WILD WEST OF BLOCKCHAIN</h2>
          <p className="headline-subtitle">TxShield Gang Brings Law & Order to the Digital Frontier</p>
        </motion.section>

        {/* Three Column Layout */}
        <div className="newspaper-columns">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="column left-column"
          >
            <h3 className="column-header">OUR STORY</h3>
            <div className="article-divider"></div>

            <p className="article-text">
              In the lawless territories of the blockchain frontier, where digital bandits roam free and smart contract
              rustlers prey on innocent settlers, a group of legendary crypto sheriffs emerged from the dust.
            </p>

            <p className="article-text">
              Founded in the boom town of 2020, TxShield began as a small outfit of code-slinging lawmen determined to
              bring justice to the wild west of decentralized finance.
            </p>

            <div className="wanted-poster">
              <div className="wanted-header">WANTED</div>
              <div className="wanted-title">SMART CONTRACT BUGS</div>
              <div className="wanted-reward">REWARD: PEACE OF MIND</div>
              <div className="wanted-description">
                Last seen terrorizing DeFi protocols. Armed and extremely dangerous to your funds.
              </div>
            </div>

            <h4 className="section-title">OUR MISSION</h4>
            <p className="article-text">
              To protect digital pioneers from the dangers lurking in smart contracts, ensuring every transaction is as
              secure as a bank vault in the most civilized town.
            </p>
          </motion.div>

          {/* Center Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="column center-column"
          >
            <h3 className="column-header">MEET THE GANG</h3>
            <div className="article-divider"></div>

            {teamMembers.map((member, index) => (
              <div key={index} className="gang-member">
                <div className="member-header">
                  <h4 className="member-name">{member.name}</h4>
                  <span className="member-bounty">Bounty: {member.bounty}</span>
                </div>
                <p className="member-role">{member.role}</p>
                <p className="member-description">{member.description}</p>
                {index < teamMembers.length - 1 && <div className="member-divider"></div>}
              </div>
            ))}

            <div className="saloon-ad">
              <div className="ad-border">
                <h4 className="ad-title">THE DIGITAL SALOON</h4>
                <p className="ad-text">"Best Smart Contract Audits This Side of the Mississippi!"</p>
                <p className="ad-signature">- Satisfied Customer, 1875... er, 2023</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="column right-column"
          >
            <h3 className="column-header">ACHIEVEMENTS</h3>
            <div className="article-divider"></div>

            <div className="achievements-grid">
              {achievements.map((achievement, index) => (
                <div key={index} className="achievement-item">
                  <achievement.icon className="achievement-icon" />
                  <div className="achievement-number">{achievement.title}</div>
                  <div className="achievement-label">{achievement.subtitle}</div>
                </div>
              ))}
            </div>

            <h4 className="section-title">TESTIMONIALS</h4>

            <div className="testimonial">
              <p className="testimonial-text">
                "These crypto sheriffs saved my ranch from a rug pull! My cattle... er, tokens are safe!"
              </p>
              <p className="testimonial-author">- Rancher Bob, DeFi Valley</p>
            </div>

            <div className="testimonial">
              <p className="testimonial-text">
                "TxShield's audit was more thorough than a marshal's investigation. Highly recommended!"
              </p>
              <p className="testimonial-author">- Mayor Johnson, Blockchain City</p>
            </div>

            <div className="sheriff-badge">
              <div className="badge-star">
                <Star className="star-icon" />
              </div>
              <div className="badge-text">
                <div className="badge-title">CERTIFIED</div>
                <div className="badge-subtitle">CRYPTO SHERIFF</div>
              </div>
            </div>

            <h4 className="section-title">LATEST NEWS</h4>
            <div className="news-item">
              <h5 className="news-headline">Gang Captures Another Smart Contract Outlaw</h5>
              <p className="news-text">
                Local DeFi protocol saved from certain doom by quick-thinking TxShield deputies.
              </p>
            </div>

            <div className="news-item">
              <h5 className="news-headline">New Sheriff in Town</h5>
              <p className="news-text">
                TxShield expands operations to protect more digital frontiers across the blockchain territories.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="newspaper-footer"
        >
          <div className="footer-ornament"></div>
          <p className="footer-text">"Bringing Law & Order to the Blockchain Frontier Since 2020"</p>
          <div className="footer-contact">
            <span>Telegraph: hello@txshield.com</span>
            <span>•</span>
            <span>Pony Express: San Francisco, CA</span>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}
