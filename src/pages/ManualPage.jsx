import { Link } from "react-router-dom";

export default function ManualPage() {
  return (
    <div className="manual-page">
      <div className="page-wrapper">
        <div className="scanline-overlay"></div>

        <header className="manual-header">
          <div className="header-badge">CLASSIFIED</div>
          <h1 className="manual-title">
            <span className="title-icon">📖</span>
            Bomb Manual
          </h1>
          <div className="header-badge">LEVEL 00</div>
        </header>

        <main className="manual-body">
          <section className="manual-section">
            <h2 className="section-heading">
              <span className="section-number">01</span>
              Wires
            </h2>
            <table className="rule-table">
              <thead>
                <tr>
                  <th>Wire Count</th>
                  <th>Instruction</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="wire-count-cell" rowSpan="3">3 wires</td>
                  <td>If there is only one red wire — cut the <span className="wire-tag wire-red">RED</span> wire</td>
                </tr>
                <tr>
                  <td>If there are no red wires — cut the <span className="wire-tag wire-neutral">LAST</span> wire</td>
                </tr>
                <tr>
                  <td>If there is more than one red wire — cut the <span className="wire-tag wire-neutral">SECOND</span> wire</td>
                </tr>
                <tr>
                  <td className="wire-count-cell" rowSpan="3">4 wires</td>
                  <td>If there is more than one yellow — cut the <span className="wire-tag wire-yellow">SECOND</span> yellow</td>
                </tr>
                <tr>
                  <td>If there is only one red with single or more blue — cut the <span className="wire-tag wire-neutral">FIRST</span> wire</td>
                </tr>
                <tr>
                  <td>If there is no blue — cut the <span className="wire-tag wire-neutral">THIRD</span> wire</td>
                </tr>
                <tr>
                  <td className="wire-count-cell" rowSpan="3">5 wires</td>
                  <td>If there is only one purple — cut the <span className="wire-tag wire-purple">PURPLE</span> wire</td>
                </tr>
                <tr>
                  <td>If there is more than one purple with no red wires — cut the <span className="wire-tag wire-neutral">SECOND</span> wire</td>
                </tr>
                <tr>
                  <td>Anything else — cut the first <span className="wire-tag wire-purple">PURPLE</span> wire</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="manual-section">
            <h2 className="section-heading">
              <span className="section-number">02</span>
              Dices
            </h2>
            <table className="rule-table dice-rule-table">
              <tbody>
                <tr>
                  <td>
                    <span className="status-badge badge-free">Free</span>
                    If you have all the vowels you get a free pass and immediately move on
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="status-badge badge-even">Even</span>
                    More than 3 vowels and serial code ends in an even number:
                    <ol className="sub-list">
                      <li>Roll until you get the same number as your non-vowels</li>
                      <li>If none (0 consonants) — roll until a die matches your last digit</li>
                      <li>If your last digit is ZERO — roll until you get a sum of 8 or higher</li>
                    </ol>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="status-badge badge-odd">Odd</span>
                    More than 3 vowels and serial code ends in an odd number — roll the same number of times as your last digit
                  </td>
                </tr>
                <tr>
                  <td>Exactly <span className="inline-highlight">2</span> vowels — roll until you get a sum greater than your last digit</td>
                </tr>
                <tr>
                  <td>Exactly <span className="inline-highlight">1</span> vowel — roll until you get a sum of 5 or below</td>
                </tr>
                <tr>
                  <td>No vowels — you are unlucky, roll until you get a <span className="inline-highlight">double</span></td>
                </tr>
                <tr>
                  <td>Otherwise — roll until your sum is a <span className="inline-highlight">multiple of 3</span></td>
                </tr>
              </tbody>
            </table>
            <h3>before moving make sure your partener has memorised the final dices he/she got</h3>
          </section>

          <section className="manual-section">
            <h2 className="section-heading">
              <span className="section-number">03</span>
              Button Positions
            </h2>
            <table className="rule-table position-rule-table">
              <tbody>
                <tr>
                  <td className="emoji-cell">✅🅰️🆚</td>
                  <td className="position-sequence">middle left right left middle right left middle left right middle left</td>
                </tr>
                <tr>
                  <td className="emoji-cell">🆎🆖🈁</td>
                  <td className="position-sequence">right middle left middle right left middle left right left middle left</td>
                </tr>
                <tr>
                  <td className="emoji-cell">🆙🔘🅾️</td>
                  <td className="position-sequence">left right middle right left middle right middle left middle right left</td>
                </tr>
                <tr>
                  <td className="emoji-cell">🆘🆔⏩</td>
                  <td className="position-sequence">middle left right left right middle left right middle right left middle</td>
                </tr>
              </tbody>
            </table>
          </section>

          <div className="manual-callout">
            in order to move on tell ur partener to press enter when the timer has the sum of the dices in the last position
          </div>
        </main>

        <footer className="manual-footer">
          <Link to="/" className="back-link">⬅ Back</Link>
          <span className="footer-stamp">DEFUSE WITH CAUTION</span>
        </footer>
      </div>
    </div>
  );
}
