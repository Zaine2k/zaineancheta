import "./Interests.css";

export default function Interests() {
  return (
    <section className="interests">
      <div className="interests__eyebrow">
        <span>INTERESTS / HOBBIES</span>
      </div>

      <div className="interests__intro">
        <h2>
          THINGS THAT
          <br />
          KEEP ME <em>CURIOUS.</em>
        </h2>

        <p>
          Outside of coding, I spend most of my time around music, film,
          games, writing, and books. Most of those interests eventually find
          their way back into the things I build anyway.
        </p>
      </div>

      <div className="interests__grid">
        {/* INTERESTS */}
        <div className="interests__panel interests__panel--hobbies">
          <div className="interests__label">INTERESTS</div>

          <div className="interests__tags">
            <div className="interests__tag">
              <span>01</span>
              <strong>MUSIC</strong>
            </div>

            <div className="interests__tag">
              <span>02</span>
              <strong>FILM</strong>
            </div>

            <div className="interests__tag">
              <span>03</span>
              <strong>GAMES</strong>
            </div>

            <div className="interests__tag">
              <span>04</span>
              <strong>WRITING</strong>
            </div>

            <div className="interests__tag">
              <span>05</span>
              <strong>TECHNOLOGY</strong>
            </div>

            <div className="interests__tag">
              <span>06</span>
              <strong>DESIGN</strong>
            </div>
          </div>

          <p className="interests__note">
            Producing records, composing, sound design, cinema, interactive
            storytelling, fiction, and building strange things with computers.
          </p>

          <p className="interests__note">
            #1 Scottie Barnes superfan, lifelong basketball analytics nerd, boxing fan,
            synthesizer enthusiast, and former gamer (1x Masters Apex Legends, 2x Celestial Marvel Rivals | Top 100 Dr. Strange NA).
          </p>

          <p className="interests__note interests__note--quote">
            &quot;Had I not created my whole world, I would certainly have died
            in other people&apos;s.&quot; — Anaïs Nin
          </p>
        </div>

        {/* BOOKSHELF */}
        <div className="interests__panel interests__panel--books">
          <div className="interests__label">BOOKSHELF</div>

          <div className="interests__books-header">
            <h3>FAVORITE BOOKS</h3>

            <p>
              Books I keep coming back to, in no particular order. I recommend
              reading them if you can. I&apos;m always open to recommendations
              too.
            </p>
          </div>

          <div className="bookshelf">
            <div className="bookshelf__row">
              <div className="book book--one">
                <span className="book__title">2666</span>
                <span className="book__author">BOLAÑO</span>
              </div>

              <div className="book book--two">
                <span className="book__title">V.</span>
                <span className="book__author">PYNCHON</span>
              </div>

              <div className="book book--three">
                <span className="book__title">
                  THE MASTER AND MARGARITA
                </span>
                <span className="book__author">BULGAKOV</span>
              </div>

              <div className="book book--four">
                <span className="book__title">SOLARIS</span>
                <span className="book__author">LEM</span>
              </div>

              <div className="book book--five">
                <span className="book__title">BY NIGHT IN CHILE</span>
                <span className="book__author">BOLAÑO</span>
              </div>

              <div className="book book--six">
                <span className="book__title">LIBRA</span>
                <span className="book__author">DELILLO</span>
              </div>

              <div className="book book--seven">
                <span className="book__title">A SHORT STAY IN HELL</span>
                <span className="book__author">PECK</span>
              </div>

              <div className="book book--eight">
                <span className="book__title">STONER</span>
                <span className="book__author">JOHN WILLIAMS</span>
              </div>

              <div className="book book--nine">
                <span className="book__title">
                  THE CRYING OF LOT 49
                </span>
                <span className="book__author">PYNCHON</span>
              </div>

              <div className="book book--ten">
                <span className="book__title">MOBY-DICK</span>
                <span className="book__author">MELVILLE</span>
              </div>

              <div className="book book--eleven">
                <span className="book__title">FAHRENHEIT 451</span>
                <span className="book__author">BRADBURY</span>
              </div>

              <div className="book book--twelve">
                <span className="book__title">DRACULA</span>
                <span className="book__author">STOKER</span>
              </div>

              <div className="book book--thirteen">
                <span className="book__title">BLOOD MERIDIAN</span>
                <span className="book__author">MCCARTHY</span>
              </div>

              <div className="book book--fourteen">
                <span className="book__title">NORWEGIAN WOOD</span>
                <span className="book__author">MURAKAMI</span>
              </div>

              <div className="book book--fifteen">
                <span className="book__title">LIFE OF PI</span>
                <span className="book__author">MARTEL</span>
              </div>

              <div className="book book--sixteen">
                <span className="book__title">THE STRANGER</span>
                <span className="book__author">CAMUS</span>
              </div>

              <div className="book book--seventeen">
                <span className="book__title">THE ODYSSEY</span>
                <span className="book__author">HOMER</span>
              </div>

              <div className="book book--eighteen">
                <span className="book__title">NO LONGER HUMAN</span>
                <span className="book__author">DAZAI</span>
              </div>

              <div className="book book--nineteen">
                <span className="book__title">NOLI ME TANGERE</span>
                <span className="book__author">RIZAL</span>
              </div>

              <div className="book book--twenty">
                <span className="book__title">
                  THE COUNT OF MONTE CRISTO
                </span>
                <span className="book__author">DUMAS</span>
              </div>

              <div className="book book--twenty-one">
                <span className="book__title">1984</span>
                <span className="book__author">ORWELL</span>
              </div>
            </div>

            <div className="bookshelf__shelf" />
          </div>
        </div>
      </div>
    </section>
  );
}