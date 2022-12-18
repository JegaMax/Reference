import { modal_default } from "../services/modalService";
import { editor_default as Editor } from "../services/editorService";
const myStory = () => {
  return (
    <div>
      <div id="modal__welcome" className="c-modal c-modal--center">
        <div className="c-modal__window c-modal__window--large mdl-card mdl-shadow--2dp">
          <img
            alt="webStories logo"
            title="webStories"
            src="/assets/images/logo-full-color.svg"
            height={64}
            className="c-logo"
          />
          <h2 className="c-modal__subtitle">
            Make amp-stories quick and easily. No code needed.
          </h2>
          <ul className="c-features">
            <li>
              <div>
                <div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={24}
                      viewBox="0 0 24 24"
                      width={24}
                    >
                      <path d="M23 7V1h-6v2H7V1H1v6h2v10H1v6h6v-2h10v2h6v-6h-2V7h2zM3 3h2v2H3V3zm2 18H3v-2h2v2zm12-2H7v-2H5V7h2V5h10v2h2v10h-2v2zm4 2h-2v-2h2v2zM19 5V3h2v2h-2zm-5.27 9h-3.49l-.73 2H7.89l3.4-9h1.4l3.41 9h-1.63l-.74-2zm-3.04-1.26h2.61L12 8.91l-1.31 3.83z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4>Visual Editor</h4>
                  <p>
                    You can edit stories through the WYSIWYG editor like you
                    used to do on Keynote or PowerPoint apps.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div>
                <div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={24}
                      viewBox="0 0 24 24"
                      width={24}
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-.61.08-1.21.21-1.78L8.99 15v1c0 1.1.9 2 2 2v1.93C7.06 19.43 4 16.07 4 12zm13.89 5.4c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41C17.92 5.77 20 8.65 20 12c0 2.08-.81 3.98-2.11 5.4z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4>Share to your public</h4>
                  <p>
                    Doesn't have a website? No problem. You can export stories
                    to a public link which anyone can access.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div>
                <div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={24}
                      viewBox="0 0 24 24"
                      width={24}
                    >
                      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 4h7l5 5v8.58l-1.84-1.84c1.28-1.94 1.07-4.57-.64-6.28C14.55 8.49 13.28 8 12 8c-1.28 0-2.55.49-3.53 1.46-1.95 1.95-1.95 5.11 0 7.05.97.97 2.25 1.46 3.53 1.46.96 0 1.92-.28 2.75-.83L17.6 20H6V4zm8.11 11.1c-.56.56-1.31.88-2.11.88s-1.55-.31-2.11-.88c-.56-.56-.88-1.31-.88-2.11s.31-1.55.88-2.11c.56-.57 1.31-.88 2.11-.88s1.55.31 2.11.88c.56.56.88 1.31.88 2.11s-.31 1.55-.88 2.11z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4>SEO Friendly</h4>
                  <p>
                    AMP-Stories are optimized to appear on Google and compatible
                    search engines. It also helps you rank better.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div>
                <div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={24}
                      viewBox="0 0 24 24"
                      width={24}
                    >
                      <path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4>Works everywhere</h4>
                  <p>Exported stories works on mobile and desktop devices.</p>
                </div>
              </div>
            </li>
          </ul>
          <button
            data-text="Continue"
            onclick="window.App.welcome();"
            className="c-button--cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
            data-upgraded=",MaterialButton"
          >
            Continue
          </button>
          <div className="c-content__footer c-content__footer--modal">
            <a href="/privacy">Privacy</a>
            <b className="c-content__separator" />
            <a href="/terms">Terms</a>
            <b className="c-content__separator" />
            <a href="mailto:feedback@webstories.io">Give Feedback</a>
          </div>
        </div>
      </div>
      <div id="body">
        <header className="c-header">
          <h1 className="c-header__logo">
            <a
              className="c-header__logoLink"
              tabIndex={0}
              href="/"
              onclick="Modal.open('modal__welcome'); return false;"
              title="webStories"
            >
              <svg
                title="webStories icon"
                xmlns="http://www.w3.org/2000/svg"
                style={{ isolation: "isolate" }}
                viewBox="0 0 1000 1000"
                className="c-icon c-header__logoImage"
                icon="logo"
                iconpack="app/solid"
                pack="app/solid"
                id="logo"
                height={18}
                data-icon="logo"
                data-icon_pack="app/solid"
              >
                <defs>
                  <clipPath id="a">
                    <path d="M0 0h1000v1000H0z" />
                  </clipPath>
                </defs>
                <g clipPath="url(#a)">
                  <path d="M458.67 17.67c-28.81 8.83-205.37 61.56-305.49 91.3-36.47 10.69-71.09 22.3-77.36 25.55-15.33 8.59-32.99 28.11-41.82 46.46-6.97 14.63-7.43 17.65-7.2 39.03 0 21.84.93 26.25 15.33 73.18 8.59 27.41 34.38 113.6 57.61 191.66 92.46 310.14 102.68 344.06 106.63 350.33l4.18 6.74 3.95-21.84c7.2-39.26 124.99-618.42 134.05-659.31 6.04-27.41 15.33-45.3 31.36-60.4 17.42-16.49 37.87-25.79 60.87-27.18 15.56-.93 26.95.7 87.58 13.01 38.33 7.9 70.86 13.94 72.48 13.71 1.86-.46.93-6.04-3.02-18.58-13.94-43.67-51.81-71.78-96.87-71.32-11.85 0-24.16 2.32-42.28 7.66z" />
                  <path d="M458.67 137.08c-26.72 9.29-49.95 29.27-60.64 52.27-3.25 7.67-11.38 40.89-20.44 85.49-58.54 285.05-106.4 521.78-107.56 531.3-2.55 21.37 6.97 50.64 23.23 70.62 8.83 10.92 27.41 23.93 41.12 28.57 11.62 3.95 77.13 17.66 255.54 53.43 157.97 31.83 160.53 32.06 177.72 30.9 29.74-2.56 62.72-25.32 76.43-53.43 5.81-12.08 9.06-27.18 71.09-330.58 48.33-236.95 58.09-286.43 58.09-297.35 0-37.17-26.71-76.2-60.87-88.98-20.21-7.43-410.96-86.42-427.69-86.42-7.9.23-19.75 1.86-26.02 4.18zM527 545" />
                </g>
              </svg>
              <span title="webstories">
                w<span className="c-header__logoTextSlide">eb</span>S
                <span className="c-header__logoTextSlide">tories</span>
              </span>
            </a>
          </h1>
          <span className="c-header__logo--beta">(beta)</span>
          <div className="c-header__actions s-hidePreloading">
            <button
              onclick="Modal.open('modal__login')"
              className="c-header__actionsButton s-showUnauthenticated"
            >
              <svg
                className="c-icon"
                xmlns="http://www.w3.org/2000/svg"
                height={24}
                viewBox="0 0 24 24"
                width={24}
              >
                <g>
                  <rect fill="none" height={24} width={24} />
                </g>
                <g>
                  <path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z" />
                </g>
              </svg>
              <span>Login</span>
            </button>
            <button
              onclick="Modal.open('modal__account')"
              className="c-header__actionsButton s-showAuthenticated"
            >
              <svg
                className="c-icon"
                xmlns="http://www.w3.org/2000/svg"
                height={24}
                viewBox="0 0 24 24"
                width={24}
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M10.25 13c0 .69-.56 1.25-1.25 1.25S7.75 13.69 7.75 13s.56-1.25 1.25-1.25 1.25.56 1.25 1.25zM15 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm7 .25c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10zM10.66 4.12C12.06 6.44 14.6 8 17.5 8c.46 0 .91-.05 1.34-.12C17.44 5.56 14.9 4 12 4c-.46 0-.91.05-1.34.12zM4.42 9.47c1.71-.97 3.03-2.55 3.66-4.44C6.37 6 5.05 7.58 4.42 9.47zM20 12c0-.78-.12-1.53-.33-2.24-.7.15-1.42.24-2.17.24-3.13 0-5.92-1.44-7.76-3.69C8.69 8.87 6.6 10.88 4 11.86c.01.04 0 .09 0 .14 0 4.41 3.59 8 8 8s8-3.59 8-8z" />
              </svg>
              <span>My Stories</span>
            </button>
            <button
              onclick="Modal.open('modal__templates');"
              className="c-header__actionsButton"
            >
              <svg
                className="c-icon"
                xmlns="http://www.w3.org/2000/svg"
                height={24}
                viewBox="0 0 24 24"
                width={24}
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z" />
              </svg>
              <span>New Story</span>
            </button>
            <button
              onclick="Editor.actions.preview();"
              className="c-header__actionsButton"
            >
              <svg
                className="c-icon"
                xmlns="http://www.w3.org/2000/svg"
                height={24}
                viewBox="0 0 24 24"
                width={24}
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 6.5c3.79 0 7.17 2.13 8.82 5.5-1.65 3.37-5.02 5.5-8.82 5.5S4.83 15.37 3.18 12C4.83 8.63 8.21 6.5 12 6.5m0-2C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5m0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5z" />
              </svg>
              <span>Preview</span>
            </button>
            <button
              onclick="Editor.actions.save();"
              className="c-header__actionsButton"
            >
              <svg
                className="c-icon"
                xmlns="http://www.w3.org/2000/svg"
                height={24}
                viewBox="0 0 24 24"
                width={24}
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z" />
              </svg>
              <span>Save</span>
            </button>
            <button
              onclick="Modal.open('modal__export')"
              className="c-header__actionsButton c-header__actionsButton--primary"
            >
              <svg
                className="c-icon"
                xmlns="http://www.w3.org/2000/svg"
                height={24}
                viewBox="0 0 24 24"
                width={24}
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />
              </svg>
              <span>Export</span>
            </button>
          </div>
        </header>
        <div id="edit-story" className="hide-if-no-js">
          <div className="snackbarContainer__Container-sc-1lvod1z-0 bzifxG">
            <div />
          </div>
          <section
            aria-label="Web Stories Editor"
            className="layout__Editor-sc-1udeiwh-0 juMOsT"
          >
            <div className="layout__Area-sc-1udeiwh-1 bVaAuh">
              <div className="dropTarget__DropTargetComponent-lfrfde-0 kkvmxN">
                <div className="dropTarget__Content-lfrfde-1 gLekvi">
                  <section
                    aria-label="Library"
                    data-testid="libraryLayout"
                    className="libraryLayout__Layout-nldvv1-0 cjfhqt"
                  >
                    <nav
                      aria-label="Library tabs"
                      className="libraryLayout__TabsArea-nldvv1-1 jDJnhh"
                    >
                      <ul
                        aria-label="Element Library Selection"
                        role="tablist"
                        aria-orientation="horizontal"
                        className="tabview__Tabs-sc-16p5pbf-0 biFIIm"
                      >
                        <li
                          id="library-tab-media"
                          aria-controls="library-tab-media"
                          aria-selected="true"
                          tabIndex={0}
                          role="tab"
                          className="tabview__Tab-sc-16p5pbf-1 bVUIGH"
                        >
                          <svg
                            viewBox="0 0 28 28"
                            fill="none"
                            aria-label="Media Gallery"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M21.35 12.04A7.49 7.49 0 0014 6c-2.89 0-5.4 1.64-6.65 4.04A5.994 5.994 0 002 16c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM21 20H8c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95A5.469 5.469 0 0114 8c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11A2.98 2.98 0 0124 17c0 1.65-1.35 3-3 3zm-8.45-5H10l4-4 4 4h-2.55v3h-2.9v-3z"
                              fill="currentColor"
                            />
                          </svg>
                        </li>
                        <li
                          id="library-tab-media3p"
                          aria-controls="library-tab-media3p"
                          aria-selected="false"
                          tabIndex={-1}
                          role="tab"
                          className="tabview__Tab-sc-16p5pbf-1 fRXvxj"
                        >
                          <svg
                            viewBox="0 0 28 28"
                            fill="none"
                            aria-label="Explore Media"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M13 6H6v7H4V6c0-1.1.9-2 2-2h7v2zM8 20l4-5 2.97 3.71L17 16l3 4H8zm11-9.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zM15 4h7c1.1 0 2 .9 2 2v7h-2V6h-7V4zm7 18h-7v2h7c1.1 0 2-.9 2-2v-7h-2v7zM4 15h2v7h7v2H6c-1.1 0-2-.9-2-2v-7z"
                              fill="currentColor"
                            />
                            <path
                              stroke="currentColor"
                              strokeWidth={2}
                              d="M5 5h18v18H5z"
                            />
                          </svg>
                        </li>
                        <li
                          id="library-tab-text"
                          aria-controls="library-tab-text"
                          aria-selected="false"
                          tabIndex={-1}
                          role="tab"
                          className="tabview__Tab-sc-16p5pbf-1 fRXvxj"
                        >
                          <div className="textIcon__TextIconContainer-sc-1bffzri-3 gQwTze">
                            <svg
                              viewBox="0 0 28 28"
                              fill="none"
                              id="text-tab-icon"
                              aria-label="Text library"
                              className="textIcon__AnimatedTextIcon-sc-1bffzri-0 kassed"
                              style={{ transform: "none" }}
                            >
                              <path
                                d="M11 21.167h2V6.833H9v3.5H7V5h14v5.333h-2v-3.5h-4v14.334h2V23h-6v-1.833z"
                                fill="currentColor"
                              />
                            </svg>
                            <button
                              aria-label="Add new text element"
                              tabIndex={-1}
                              className="textIcon__QuickAction-sc-1bffzri-2 keurFv"
                            >
                              <svg
                                viewBox="0 0 28 28"
                                fill="none"
                                className="textIcon__AnimatedTextAddIcon-sc-1bffzri-1 btuqDp"
                                style={{ transform: "none" }}
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M13.833 8A5.835 5.835 0 008 13.833a5.835 5.835 0 005.833 5.834 5.836 5.836 0 005.834-5.834A5.835 5.835 0 0013.833 8zm-.583 2.917v2.333h-2.333v1.167h2.333v2.333h1.167v-2.333h2.333V13.25h-2.333v-2.333H13.25zm-4.083 2.916a4.673 4.673 0 004.666 4.667 4.673 4.673 0 004.667-4.667 4.673 4.673 0 00-4.667-4.666 4.673 4.673 0 00-4.666 4.666z"
                                  fill="currentColor"
                                />
                              </svg>
                            </button>
                          </div>
                        </li>
                        <li
                          id="library-tab-shapes"
                          aria-controls="library-tab-shapes"
                          aria-selected="false"
                          tabIndex={-1}
                          role="tab"
                          className="tabview__Tab-sc-16p5pbf-1 fRXvxj"
                        >
                          <svg
                            viewBox="0 0 28 28"
                            fill="none"
                            aria-label="Shapes library"
                          >
                            <g stroke="currentColor" strokeWidth="1.5">
                              <path
                                d="M15.729 22.25l3.897-6.75 3.897 6.75h-7.794z"
                                strokeLinecap="round"
                              />
                              <rect
                                x="9.75"
                                y="4.75"
                                width="8.5"
                                height="8.5"
                                rx="4.25"
                              />
                              <path
                                fill="currentColor"
                                d="M7.275 14.024l5.63 3.25-3.25 5.63-5.63-3.25z"
                              />
                            </g>
                          </svg>
                        </li>
                      </ul>
                    </nav>
                    <div className="libraryLayout__LibraryPaneContainer-nldvv1-2 lazHvD">
                      <section
                        id="library-pane-media"
                        aria-labelledby="library-tab-media"
                        role="tabpanel"
                        aria-expanded="true"
                        className="shared__Pane-sc-1a2gwqb-0 styles__StyledPane-sc-18b8h4g-6 iOKXNq dpOFNH"
                      >
                        <div className="styles__PaneInner-sc-18b8h4g-0 gXgIzc">
                          <div className="styles__PaneHeader-sc-18b8h4g-1 kFGmVk">
                            <div className="styles__SearchInputContainer-sc-18b8h4g-7 hqEpLw">
                              <div className="searchInput__SearchField-sc-3qj1wf-0 fNuBLo">
                                <div className="text__Container-sc-11qrhrv-1 dnwigv searchInput__Search-sc-3qj1wf-1 kenVNb">
                                  <input
                                    type="text"
                                    placeholder="Search"
                                    aria-label="Search from library"
                                    className="input__Input-sc-1db51zv-0 text__StyledInput-sc-11qrhrv-0 fpJyiX TliPb"
                                    defaultValue
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="mediaPane__FilterArea-sc-1d3dx0b-0 fKBQMN">
                              <div className="dropDown__DropDownContainer-sc-455pub-0 khaqwg">
                                <button
                                  aria-pressed="false"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                  aria-disabled="false"
                                  className="dropDown__DropDownSelect-sc-455pub-1 hJSar"
                                >
                                  <span className="dropDown__DropDownTitle-sc-455pub-2 fpdLyx">
                                    All Types
                                  </span>
                                  <svg viewBox="0 0 28 28" fill="none">
                                    <path
                                      d="M8.166 11.086l5.833 5.833 5.834-5.833H8.166z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </button>
                              </div>
                              <button className="button__Base-uaxtbg-0 button__PrimaryButton-uaxtbg-3 gvavBk fgfJqH">
                                Upload
                              </button>
                            </div>
                          </div>
                          <div className="styles__MediaGalleryMessage-sc-18b8h4g-5 kEmYVu">
                            No media found
                          </div>
                        </div>
                      </section>
                      <section
                        id="library-pane-media3p"
                        aria-labelledby="library-tab-media3p"
                        role="tabpanel"
                        aria-expanded="false"
                        hidden
                        className="shared__Pane-sc-1a2gwqb-0 styles__StyledPane-sc-18b8h4g-6 iOKXNq dpOFNH"
                      >
                        <div className="styles__PaneInner-sc-18b8h4g-0 gXgIzc">
                          <div className="styles__PaneHeader-sc-18b8h4g-1 kFGmVk">
                            <div className="styles__SearchInputContainer-sc-18b8h4g-7 hqEpLw">
                              <div className="searchInput__SearchField-sc-3qj1wf-0 fNuBLo">
                                <div className="text__Container-sc-11qrhrv-1 dnwigv searchInput__Search-sc-3qj1wf-1 kenVNb">
                                  <input
                                    type="text"
                                    placeholder="Search"
                                    aria-label="Search from library"
                                    className="input__Input-sc-1db51zv-0 text__StyledInput-sc-11qrhrv-0 fpJyiX TliPb"
                                    defaultValue
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="media3pPane__ProviderTabSection-sc-5865ge-0 gbFYPC">
                              <button
                                tabIndex={0}
                                data-testid="providerTab"
                                data-provider-type="unsplash"
                                id="provider-tab-unsplash"
                                className="providerTab__Tab-x95a82-0 cShjPi"
                              >
                                Images
                              </button>
                              <button
                                tabIndex={-1}
                                data-testid="providerTab"
                                data-provider-type="coverr"
                                id="provider-tab-coverr"
                                className="providerTab__Tab-x95a82-0 cShjPi"
                              >
                                Video
                              </button>
                              <button
                                tabIndex={-1}
                                data-testid="providerTab"
                                data-provider-type="tenor"
                                id="provider-tab-tenor"
                                className="providerTab__Tab-x95a82-0 cShjPi"
                              >
                                GIFs
                              </button>
                            </div>
                          </div>
                          <div className="media3pPane__PaneBottom-sc-5865ge-2 hQOvfK">
                            <div
                              aria-hidden="true"
                              id="provider-bottom-wrapper-unsplash"
                              className="media3pPane__ProviderMediaCategoriesWrapper-sc-5865ge-3 hDVtUK"
                            >
                              <div className="pillGroup__Section-gfzoal-0 jgidD" />
                              <div
                                data-testid="media-subheading"
                                className="media3pPane__MediaSubheading-sc-5865ge-1 dxIego"
                              >
                                Trending
                              </div>
                              <div
                                data-testid="media-gallery-container"
                                className="styles__MediaGalleryContainer-sc-18b8h4g-2 drDfsd"
                              >
                                <div className="styles__MediaGalleryInnerContainer-sc-18b8h4g-3 fBrxnq">
                                  <div style={{ marginBottom: "15px" }}>
                                    <div>
                                      <div>&nbsp;</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <a
                                href="https://unsplash.com?utm_source=web_stories_wordpress&utm_medium=referral"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <div className="attribution__AttributionPill-sc-1pu0mh2-0 bOYvLJ">
                                  Powered by
                                  <svg
                                    viewBox="0 0 457.19 104.19"
                                    className="attribution__UnsplashLogo-sc-1pu0mh2-1 gFuLMb"
                                  >
                                    <path d="M59.88 38.66h27.53v48.75H0V38.66h27.53v24.37h32.35zm93 25c0 8.25-5.45 13.13-12.9 13.13-7.28 0-12.81-4.88-12.81-13.13V24.41h-12.22v39.13c0 15.45 11 25.21 25.06 25.21s25.15-9.76 25.15-25.21V24.41h-12.25zm43.7-21.13c-4.7 0-9.94 2-12.6 6.57v-5.41h-11.45v43.64h11.81v-25.1c0-5 3-9 8.16-9 5.68 0 8.08 3.82 8.08 8.7v25.4h11.8V59.82c.03-9.59-4.94-17.31-15.77-17.31zm43.31 18.37l-6.48-1.33c-2.47-.5-4-1.77-4-3.9 0-2.49 2.23-4.35 5.33-4.35 4.36 0 6.09 2.25 6.51 4.88h10.18c-.08-6-4.83-13.84-16.51-13.84-9.41 0-16.33 6.47-16.33 14.28 0 6.13 3.81 11.19 12.24 13l6.05 1.33c3.37.71 4.7 2.31 4.7 4.26 0 2.31-2.14 4.35-6 4.35-4.71 0-7.27-2.68-7.87-5.79h-10.5c.59 6.53 5.32 14.84 18.46 14.84 11.45 0 17.22-7.28 17.22-14.38-.01-6.36-4.36-11.59-12.97-13.37zm63.19 4.53c0 13.22-8.26 23-20.59 23-6 0-10.48-2.4-12.61-5.33v21.13h-11.8V43.67h11.45v5.41c2-3.37 6.83-6.39 13.4-6.39 12.81 0 20.18 9.76 20.18 22.72zm-11.63.09c0-7.72-4.79-12.25-10.83-12.25s-10.91 4.53-10.91 12.25 4.88 12.33 10.91 12.33 10.91-4.54 10.91-12.35zm68-21.83h11.45v43.64h-11.8v-5.31c-2 3.5-6.57 6.38-12.61 6.38-12.33 0-20.59-9.77-20.59-23 0-13 7.37-22.72 20.15-22.72 6.57 0 11.32 3.05 13.4 6.39zm-.18 21.83c0-7.72-4.88-12.25-10.91-12.25s-10.83 4.51-10.83 12.23 4.79 12.33 10.83 12.33 10.92-4.6 10.92-12.33zm-50.66 21.81h11.8V24.41h-11.8zm132.35-44.81c-4.17 0-9 1.41-11.81 4.78V24.41h-11.8v62.91h11.8V61.68c.27-4.8 3.2-8.52 8.17-8.52 5.68 0 8.08 3.83 8.07 8.71v25.47h11.81V59.82c-.01-9.59-5.15-17.3-16.24-17.3zm-42 18.36l-6.43-1.33c-2.47-.5-4-1.77-4-3.9 0-2.49 2.22-4.35 5.33-4.35 4.35 0 6.08 2.25 6.5 4.88h10.17c-.08-6-4.83-13.84-16.51-13.84-9.41 0-16.33 6.47-16.33 14.28 0 6.13 3.82 11.19 12.25 13l6 1.33c3.37.71 4.7 2.31 4.7 4.26 0 2.31-2.14 4.35-6 4.35-4.71 0-7.27-2.68-7.87-5.79h-10.49c.58 6.53 5.31 14.84 18.45 14.84 11.45 0 17.22-7.28 17.22-14.38 0-6.34-4.35-11.57-12.95-13.35zM59.88 0H27.53v24.37h32.35z" />
                                  </svg>
                                </div>
                              </a>
                            </div>
                            <div
                              aria-hidden="true"
                              id="provider-bottom-wrapper-coverr"
                              className="media3pPane__ProviderMediaCategoriesWrapper-sc-5865ge-3 hDVtUK"
                            >
                              <div
                                data-testid="media-subheading"
                                className="media3pPane__MediaSubheading-sc-5865ge-1 dxIego"
                              >
                                Trending
                              </div>
                              <div
                                data-testid="media-gallery-container"
                                className="styles__MediaGalleryContainer-sc-18b8h4g-2 drDfsd"
                              >
                                <div className="styles__MediaGalleryInnerContainer-sc-18b8h4g-3 fBrxnq">
                                  <div style={{ marginBottom: "15px" }}>
                                    <div>
                                      <div>&nbsp;</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <a
                                href="https://coverr.co?utm_source=web_stories_wordpress&utm_medium=referral&utm_campaign=api_powered_by"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <div className="attribution__AttributionPill-sc-1pu0mh2-0 bOYvLJ">
                                  Powered by
                                  <svg
                                    viewBox="0 0 742 132"
                                    fill="none"
                                    className="attribution__CoverrLogo-sc-1pu0mh2-2 gjLNOi"
                                  >
                                    <g clipPath="url(#coverr_logo_svg__clip0)">
                                      <path
                                        d="M17.875 112.892C5.958 100.096 0 84.494 0 65.912c0-18.757 5.958-34.358 17.875-46.804C29.967 6.31 45.04 0 62.914 0h19.453S72.202 26.645 62.563 26.645c-10.514 0-19.277 3.682-26.462 11.22-6.835 7.537-10.515 16.828-10.515 28.047 0 11.22 3.505 20.51 10.515 28.048 7.185 7.538 15.948 11.219 26.462 11.219 8.763 0 14.02 26.646 14.02 26.646H62.74c-17.7.175-32.772-6.136-44.864-18.933z"
                                        fill="#0072BB"
                                      />
                                      <path
                                        d="M34.699 112.892c-11.917-12.796-17.875-28.398-17.875-46.98 0-18.757 5.958-34.358 17.875-46.804C46.791 6.31 61.862 0 79.738 0H99.19S89.026 26.645 79.387 26.645c-10.515 0-19.277 3.682-26.462 11.22C46.09 45.401 42.41 54.692 42.41 65.912c0 11.22 3.505 20.51 10.515 28.048 7.185 7.538 15.947 11.219 26.462 11.219 8.763 0 14.02 26.646 14.02 26.646H79.563c-17.7.175-32.772-6.136-44.864-18.933z"
                                        fill="#7DC24B"
                                      />
                                      <path
                                        d="M51.523 112.892c-11.917-12.796-17.875-28.398-17.875-46.98 0-18.757 5.958-34.358 17.875-46.98C63.79 6.311 78.686 0 96.562 0h19.452s-9.989 26.645-19.627 26.645c-10.515 0-19.278 3.682-26.463 11.22-6.835 7.537-10.515 16.828-10.515 28.047 0 11.22 3.505 20.51 10.515 28.048 7.185 7.713 15.948 11.395 26.462 11.395 8.763 0 14.02 26.645 14.02 26.645H96.562c-17.876 0-32.772-6.311-45.039-19.108z"
                                        fill="#FED035"
                                      />
                                      <path
                                        d="M68.347 112.892C56.43 100.096 50.47 84.494 50.47 65.912c0-18.757 5.959-34.358 17.876-46.98C80.614 6.311 95.51 0 113.385 0h19.453s-10.164 26.645-19.803 26.645c-10.515 0-19.277 3.682-26.462 11.22-6.835 7.537-10.515 16.828-10.515 28.047 0 11.22 3.505 20.51 10.514 28.048 7.186 7.538 15.948 11.219 26.463 11.219 8.762 0 14.02 26.646 14.02 26.646H113.21c-17.7.175-32.596-6.136-44.863-18.933z"
                                        fill="#FF4C3D"
                                      />
                                      <path
                                        d="M86.047 112.892C74.13 100.096 68.17 84.494 68.17 65.912c0-18.757 5.959-34.358 17.876-46.98C98.139 6.311 113.21 0 131.085 0c23.133 0 43.637 12.621 53.101 32.43l-22.082 13.498c-5.432-12.095-16.999-19.283-31.194-19.283-10.515 0-19.277 3.682-26.462 11.22-6.835 7.537-10.515 16.828-10.515 28.047 0 11.22 3.505 20.51 10.515 28.048 7.185 7.538 15.947 11.219 26.462 11.219 14.02 0 25.937-7.538 31.72-19.283l22.081 13.323C174.547 119.378 154.218 132 131.085 132c-17.875 0-32.946-6.311-45.038-19.108zM213.102 112.892c-12.092-12.796-18.401-28.398-18.401-46.98 0-18.581 6.134-34.183 18.401-46.98C225.194 6.311 240.265 0 257.615 0c17.7 0 32.421 6.31 44.513 19.108 12.092 12.796 18.401 28.398 18.401 46.98 0 18.581-6.134 34.183-18.401 46.98-12.092 12.797-26.988 19.107-44.513 19.107-17.35-.175-32.421-6.486-44.513-19.283zm44.513-7.187c10.515 0 19.277-3.681 26.462-11.219 7.186-7.538 10.691-17.004 10.691-28.398 0-11.22-3.505-20.86-10.691-28.399-7.185-7.538-15.947-11.394-26.462-11.394s-19.277 3.681-26.462 11.219c-7.186 7.538-10.691 17.004-10.691 28.398 0 11.22 3.505 20.86 10.691 28.399 7.185 7.538 15.947 11.394 26.462 11.394zM419.895 3.33h28.039l-46.44 125.514h-29.793L325.261 3.331H353.3l33.298 95.362 33.297-95.362zM479.654 77.482c3.855 19.108 18.401 29.626 38.204 29.626 13.669 0 23.833-5.259 30.668-15.602l21.205 12.972c-11.742 18.231-29.091 27.347-52.224 27.347-19.277 0-35.05-6.311-46.966-18.582-11.917-12.621-17.876-28.398-17.876-47.506 0-18.757 5.959-34.358 17.7-46.98C482.107 6.311 497.354 0 515.755 0c17.349 0 31.72 6.486 42.935 19.283 11.216 12.797 16.999 28.574 16.999 46.98 0 2.805-.175 6.486-.876 11.22h-95.159zm69.924-22.088c-3.505-20.334-17.175-30.852-33.999-30.852-19.102 0-32.421 11.745-35.925 30.852h69.924zM623.883 24.366c6.484-15.602 18.751-23.315 36.627-23.315v29.275c-9.814-.701-18.401 1.753-25.762 7.538-7.36 5.434-11.041 14.725-11.041 27.522v63.283h-25.761V3.33h25.937v21.036zM705.374 24.366C711.858 8.764 724.125 1.051 742 1.051v29.275c-9.813-.701-18.401 1.753-25.761 7.538-7.36 5.434-11.041 14.725-11.041 27.522v63.283h-25.761V3.33h25.761v21.036h.176z"
                                        fill="#fff"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="coverr_logo_svg__clip0">
                                        <path fill="#fff" d="M0 0h742v132H0z" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </a>
                            </div>
                            <div
                              aria-hidden="true"
                              id="provider-bottom-wrapper-tenor"
                              className="media3pPane__ProviderMediaCategoriesWrapper-sc-5865ge-3 hDVtUK"
                            >
                              <div className="pillGroup__Section-gfzoal-0 jgidD" />
                              <div
                                data-testid="media-subheading"
                                className="media3pPane__MediaSubheading-sc-5865ge-1 dxIego"
                              >
                                Trending
                              </div>
                              <div
                                data-testid="media-gallery-container"
                                className="styles__MediaGalleryContainer-sc-18b8h4g-2 drDfsd"
                              >
                                <div className="styles__MediaGalleryInnerContainer-sc-18b8h4g-3 fBrxnq">
                                  <div style={{ marginBottom: "15px" }}>
                                    <div>
                                      <div>&nbsp;</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <a
                                href="https://tenor.com?utm_source=web_stories_wordpress&utm_medium=referral"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <div className="attribution__AttributionPill-sc-1pu0mh2-0 bOYvLJ">
                                  <svg
                                    viewBox="0 0 1386 177"
                                    data-label="Powered by Tenor"
                                    className="attribution__TenorLogo-sc-1pu0mh2-3 iHarVl"
                                  >
                                    <defs>
                                      <path
                                        id="tenor_logo_white_svg__a"
                                        d="M0 .136H92.92v175.707H0z"
                                      />
                                      <path
                                        id="tenor_logo_white_svg__c"
                                        d="M0 .383h82.728V137.28H0z"
                                      />
                                    </defs>
                                    <g fill="none" fillRule="evenodd">
                                      <path
                                        d="M961.4 97.28c-.594-5.14-2.057-9.885-3.995-14.512-11.547-27.168-41.562-27.88-56.984-14.632-8.107 6.96-12.892 15.858-15.265 26.14-.237.949-.316 1.898-.514 3.005H961.4zm-77.193 20.13c.95 7.118 3.005 13.484 6.644 19.218 8.541 13.485 20.959 19.892 36.856 19.773 13.05-.08 24.24-4.825 33.89-13.525 5.062-4.587 12.18-3.717 15.739 1.78 2.57 3.955 2.056 8.74-1.503 12.299-10.796 10.795-23.648 17.518-38.873 19.377-9.965 1.226-19.89.988-29.58-2.017-22.066-6.841-36.737-21.473-43.262-43.46-7.632-25.823-3.559-49.827 14.434-70.47 12.22-13.96 28.038-20.603 46.663-20.286 16.056.276 30.055 5.734 41.325 17.4 9.372 9.688 14.553 21.512 16.925 34.641.91 4.983 1.305 10.045 1.543 15.106.277 5.576-4.073 9.926-9.65 10.203-.79.04-1.581 0-2.372 0h-85.971c-.791-.04-1.622-.04-2.808-.04zM1256.802 109.383c-.198-13.564-4.113-24.874-12.694-34.444-17.518-19.575-49.51-18.824-66.318 1.344-13.999 16.807-14.987 46.466 1.266 64.736 14.473 16.293 40.494 19.654 58.21 7 13.485-9.65 19.14-23.293 19.536-38.636m-113.337-1.82c.04-34.957 27.128-67.82 68.571-67.74 38.636.04 68.255 29.975 68.177 68.887-.08 38.24-30.292 68.057-69.007 68.097-37.291 0-67.82-31.161-67.741-69.244M1030.173 59.042c2.491-2.373 4.508-4.39 6.604-6.288 10.123-9.254 22.224-13.05 35.709-12.931 10.637.118 20.643 2.491 29.5 8.66 10.994 7.672 16.966 18.547 19.298 31.478a76.652 76.652 0 011.187 12.773c.119 24.202.04 48.364.04 72.566 0 4.626-2.927 9.016-7.237 10.598-4.508 1.66-8.74.988-12.22-2.492-2.451-2.412-3.52-5.457-3.52-8.937.04-22.422.12-44.805-.078-67.227-.04-4.429-.672-8.976-1.74-13.247-3.362-13.09-12.734-21.038-26.14-22.58-9.53-1.108-18.586.395-26.534 6.168-10.559 7.672-14.79 18.587-14.83 31.241-.079 22.066 0 44.172-.04 66.238 0 8.463-8.225 13.96-16.055 10.757-4.152-1.7-6.96-6.21-6.96-11.27v-113.1c0-4.469 2.057-7.87 5.853-10.084 3.915-2.294 7.988-2.175 11.824.237 3.282 2.096 5.26 5.141 5.339 9.175.04 2.61 0 5.14 0 8.265"
                                        fill="#FFF"
                                      />
                                      <g transform="translate(760 .259)">
                                        <mask
                                          id="tenor_logo_white_svg__b"
                                          fill="#fff"
                                        >
                                          <use xlinkHref="#tenor_logo_white_svg__a" />
                                        </mask>
                                        <path
                                          d="M49.11 42.054h31.044c4.27.199 7.75 1.583 9.965 5.419 3.678 6.445-.079 14.236-7.434 15.343-1.147.158-2.373.198-3.56.197H49.037V135.817c.075 4.745.826 9.293 4.03 13.168 2.61 3.164 6.129 4.509 9.965 5.102 5.734.91 11.428.434 17.004-1.306 5.3-1.7 10.52.673 12.299 5.616 1.819 5.022-.752 9.965-5.655 12.338-6.644 3.243-13.604 4.666-20.96 5.062-19.06.95-36.183-12.892-39.07-31.794-.395-2.452-.514-4.983-.514-7.475-.04-23.53-.04-47.058-.035-70.588v-2.728c-.874-.04-1.586-.12-2.258-.12-4.35 0-8.7.08-13.05-.039C3.674 62.856-.914 57.517.154 50.794c.751-4.745 5.062-8.304 10.48-8.462 4.27-.119 8.58-.04 12.852-.04 2.61 0 2.61 0 2.614-2.728V12.08C26.096 5.357 30.96.216 37.445.136c6.486-.078 11.587 5.102 11.626 11.905.04 9.213 0 18.467 0 27.681.04.751.04 1.542.04 2.53v-.198z"
                                          fill="#FFF"
                                          mask="url(#tenor_logo_white_svg__b)"
                                        />
                                      </g>
                                      <g transform="translate(1302.955 39.409)">
                                        <mask
                                          id="tenor_logo_white_svg__d"
                                          fill="#fff"
                                        >
                                          <use xlinkHref="#tenor_logo_white_svg__c" />
                                        </mask>
                                        <path
                                          d="M23.095 28.135c3.4-3.875 6.405-7.711 9.886-11.112 7.948-7.75 17.28-13.169 28.275-15.344 3.321-.672 6.801-.83 10.202-.672 6.446.356 11.27 5.734 11.27 12.061 0 6.249-4.903 11.548-11.27 12.14-4.706.436-9.49.515-14.117 1.503-12.694 2.73-21.671 10.4-27.445 21.909-5.062 10.044-6.762 20.88-6.801 31.992-.08 14.829 0 29.658 0 44.488 0 6.88-5.063 12.22-11.588 12.18C4.943 137.24 0 132.139 0 125.258V11.803C0 6.663 3.638 1.996 8.542.77c5.378-1.345 10.598.87 12.93 5.813.91 1.898 1.425 4.113 1.504 6.248.237 4.39.079 8.819.079 13.248.04.672.04 1.305.04 2.056"
                                          fill="#FFF"
                                          mask="url(#tenor_logo_white_svg__d)"
                                        />
                                      </g>
                                      <path
                                        d="M35.938 68.125c6.416 0 12.166 1.417 17.25 4.25 5.083 2.833 9.062 6.792 11.937 11.875s4.313 10.958 4.313 17.625-1.438 12.562-4.313 17.688c-2.875 5.125-6.854 9.104-11.938 11.937-5.083 2.833-10.833 4.25-17.25 4.25-4.75 0-9.104-.917-13.062-2.75s-7.312-4.5-10.063-8v34.25h-12v-90.5h11.5v10.5c2.667-3.667 6.042-6.437 10.126-8.313 4.083-1.875 8.583-2.812 13.5-2.812zm-1 57.125c4.25 0 8.062-.98 11.437-2.938 3.375-1.958 6.042-4.708 8-8.25 1.958-3.541 2.938-7.604 2.938-12.187 0-4.583-.98-8.646-2.938-12.188-1.958-3.541-4.625-6.27-8-8.187-3.375-1.917-7.187-2.875-11.438-2.875-4.166 0-7.937.98-11.312 2.938-3.375 1.958-6.042 4.687-8 8.187-1.958 3.5-2.938 7.542-2.938 12.125s.959 8.646 2.876 12.188c1.916 3.541 4.583 6.291 8 8.25 3.416 1.958 7.208 2.937 11.375 2.937zm78.5 10.5c-6.584 0-12.5-1.458-17.75-4.375s-9.355-6.937-12.313-12.063c-2.958-5.125-4.438-10.937-4.438-17.437 0-6.5 1.48-12.312 4.438-17.438 2.958-5.125 7.062-9.124 12.313-12 5.25-2.875 11.166-4.312 17.75-4.312 6.583 0 12.479 1.437 17.687 4.313 5.208 2.875 9.292 6.874 12.25 12 2.958 5.125 4.438 10.937 4.438 17.437 0 6.5-1.48 12.312-4.438 17.438-2.958 5.125-7.042 9.145-12.25 12.062s-11.104 4.375-17.688 4.375zm0-10.5c4.25 0 8.062-.98 11.437-2.938 3.375-1.958 6.02-4.708 7.938-8.25 1.916-3.541 2.875-7.604 2.875-12.187 0-4.583-.959-8.646-2.875-12.188-1.917-3.541-4.563-6.27-7.938-8.187-3.375-1.917-7.187-2.875-11.438-2.875-4.25 0-8.062.958-11.437 2.875s-6.042 4.646-8 8.188c-1.958 3.541-2.938 7.604-2.938 12.187 0 4.583.98 8.646 2.938 12.188 1.958 3.541 4.625 6.291 8 8.25 3.375 1.958 7.187 2.937 11.438 2.937zm148.375-56.5L237.063 135h-11.5l-19.125-50.25L187.063 135h-11.5l-24.625-66.25h11.375l19.25 52.75 20-52.75h10.125l19.625 53 19.75-53h10.75zm69.125 33.5c0 .917-.084 2.125-.25 3.625h-53.75c.75 5.833 3.312 10.52 7.687 14.063 4.375 3.541 9.812 5.312 16.313 5.312 7.916 0 14.291-2.667 19.125-8l6.625 7.75c-3 3.5-6.73 6.167-11.188 8-4.458 1.833-9.437 2.75-14.938 2.75-7 0-13.208-1.437-18.625-4.313-5.416-2.875-9.604-6.895-12.562-12.062s-4.438-11-4.438-17.5c0-6.417 1.438-12.208 4.313-17.375s6.833-9.187 11.875-12.063c5.042-2.875 10.73-4.312 17.063-4.312 6.333 0 11.979 1.437 16.937 4.313 4.958 2.875 8.833 6.895 11.625 12.062s4.188 11.083 4.188 17.75zm-32.75-24c-5.75 0-10.563 1.75-14.438 5.25s-6.146 8.083-6.813 13.75h42.5c-.666-5.583-2.937-10.146-6.812-13.688-3.875-3.541-8.687-5.312-14.438-5.312zm59.875 1.625c2.083-3.833 5.166-6.75 9.25-8.75 4.083-2 9.041-3 14.875-3V79.75c-.667-.083-1.584-.125-2.75-.125-6.5 0-11.605 1.937-15.313 5.813-3.708 3.875-5.563 9.395-5.563 16.562v33h-12V68.75h11.5v11.125zm97.125 22.375c0 .917-.084 2.125-.25 3.625h-53.75c.75 5.833 3.312 10.52 7.687 14.063 4.375 3.541 9.812 5.312 16.313 5.312 7.916 0 14.291-2.667 19.125-8l6.625 7.75c-3 3.5-6.73 6.167-11.188 8-4.458 1.833-9.437 2.75-14.938 2.75-7 0-13.208-1.437-18.625-4.313-5.416-2.875-9.604-6.895-12.562-12.062s-4.438-11-4.438-17.5c0-6.417 1.438-12.208 4.313-17.375s6.833-9.187 11.875-12.063c5.042-2.875 10.73-4.312 17.063-4.312 6.333 0 11.979 1.437 16.937 4.313 4.958 2.875 8.833 6.895 11.625 12.062s4.188 11.083 4.188 17.75zm-32.75-24c-5.75 0-10.563 1.75-14.438 5.25s-6.146 8.083-6.813 13.75h42.5c-.666-5.583-2.937-10.146-6.812-13.688-3.875-3.541-8.687-5.312-14.438-5.312zm110.875-36V135h-11.5v-10.5c-2.667 3.667-6.042 6.458-10.125 8.375-4.084 1.917-8.584 2.875-13.5 2.875-6.417 0-12.167-1.417-17.25-4.25-5.084-2.833-9.063-6.812-11.938-11.938-2.875-5.125-4.313-11.02-4.313-17.687 0-6.667 1.438-12.542 4.313-17.625s6.854-9.042 11.938-11.875c5.083-2.833 10.833-4.25 17.25-4.25 4.75 0 9.124.896 13.125 2.688 4 1.791 7.333 4.437 10 7.937v-36.5h12zm-34.125 83c4.166 0 7.958-.98 11.375-2.938 3.416-1.958 6.083-4.708 8-8.25 1.916-3.541 2.875-7.604 2.875-12.187 0-4.583-.959-8.646-2.875-12.188-1.917-3.541-4.584-6.27-8-8.187-3.417-1.917-7.209-2.875-11.375-2.875-4.25 0-8.063.958-11.438 2.875s-6.042 4.646-8 8.188c-1.958 3.541-2.938 7.604-2.938 12.187 0 4.583.98 8.646 2.938 12.188 1.958 3.541 4.625 6.291 8 8.25 3.375 1.958 7.187 2.937 11.438 2.937zm123.625-57.125c6.416 0 12.166 1.417 17.25 4.25 5.083 2.833 9.062 6.792 11.937 11.875s4.313 10.958 4.313 17.625-1.438 12.562-4.313 17.688c-2.875 5.125-6.854 9.104-11.938 11.937-5.083 2.833-10.833 4.25-17.25 4.25-4.916 0-9.416-.958-13.5-2.875-4.083-1.917-7.458-4.708-10.125-8.375V135h-11.5V42.25h12v36.5c2.667-3.5 6-6.146 10-7.938 4-1.791 8.375-2.687 13.125-2.687zm-1 57.125c4.25 0 8.062-.98 11.437-2.938 3.375-1.958 6.042-4.708 8-8.25 1.958-3.541 2.938-7.604 2.938-12.187 0-4.583-.98-8.646-2.938-12.188-1.958-3.541-4.625-6.27-8-8.187-3.375-1.917-7.187-2.875-11.438-2.875-4.166 0-7.958.958-11.375 2.875-3.416 1.917-6.083 4.646-8 8.188-1.916 3.541-2.875 7.604-2.875 12.187 0 4.583.959 8.646 2.875 12.188 1.917 3.541 4.584 6.291 8 8.25 3.417 1.958 7.209 2.937 11.375 2.937zm106.875-56.5l-32.125 72.875c-2.834 6.75-6.146 11.5-9.938 14.25-3.792 2.75-8.354 4.125-13.688 4.125-3.25 0-6.395-.52-9.437-1.563-3.042-1.041-5.563-2.562-7.563-4.562l5.125-9c3.417 3.25 7.375 4.875 11.875 4.875 2.917 0 5.355-.77 7.313-2.313 1.958-1.541 3.73-4.187 5.313-7.937l2.125-4.625-29.25-66.125h12.5l23.125 53 22.875-53h11.75z"
                                        fill="#FFF"
                                        fillRule="nonzero"
                                      />
                                    </g>
                                  </svg>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </section>
                      <section
                        id="library-pane-shapes"
                        aria-labelledby="library-tab-shapes"
                        role="tabpanel"
                        aria-expanded="false"
                        hidden
                        className="shared__Pane-sc-1a2gwqb-0 iOKXNq"
                      >
                        <div className="section__Container-wvkpzl-0 eAMxaX">
                          <h2 className="section__Title-wvkpzl-1 jzDtNg">
                            Basic shapes
                          </h2>
                          <div className="shapesPane__SectionContent-vnnbwb-0 fFCuWK">
                            <div className="shapePreview__Aspect-sc-190zgsi-0 htfVsC">
                              <div className="shapePreview__AspectInner-sc-190zgsi-1 hXCksd">
                                <button
                                  draggable="true"
                                  aria-label="Rectangle"
                                  className="shapePreview__ShapePreviewContainer-sc-190zgsi-2 IqIdB"
                                >
                                  <div className="shapePreview__ShapePreviewSizer-sc-190zgsi-3 jfsOxj" />
                                  <svg viewBox="0 0 1 1" width={36} height={36}>
                                    <title>Rectangle</title>
                                    <path
                                      d="M 0,0 1,0 1,1 0,1 0,0 Z"
                                      className="shapePreview__Path-sc-190zgsi-4 caiojl"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div className="shapePreview__Aspect-sc-190zgsi-0 htfVsC">
                              <div className="shapePreview__AspectInner-sc-190zgsi-1 hXCksd">
                                <button
                                  draggable="true"
                                  aria-label="Circle"
                                  className="shapePreview__ShapePreviewContainer-sc-190zgsi-2 IqIdB"
                                >
                                  <div className="shapePreview__ShapePreviewSizer-sc-190zgsi-3 jfsOxj" />
                                  <svg viewBox="0 0 1 1" width={36} height={36}>
                                    <title>Circle</title>
                                    <path
                                      d="M 0.5 0 C 0.777344 0 1 0.222656 1 0.5 C 1 0.777344 0.777344 1 0.5 1 C 0.222656 1 0 0.777344 0 0.5 C 0 0.222656 0.222656 0 0.5 0 Z"
                                      className="shapePreview__Path-sc-190zgsi-4 caiojl"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div className="shapePreview__Aspect-sc-190zgsi-0 htfVsC">
                              <div className="shapePreview__AspectInner-sc-190zgsi-1 hXCksd">
                                <button
                                  draggable="true"
                                  aria-label="Triangle"
                                  className="shapePreview__ShapePreviewContainer-sc-190zgsi-2 IqIdB"
                                >
                                  <div className="shapePreview__ShapePreviewSizer-sc-190zgsi-3 jfsOxj" />
                                  <svg viewBox="0 0 1 1" width={36} height={36}>
                                    <title>Triangle</title>
                                    <path
                                      d="M 0.5 0 L 1 1 L 0 1 Z"
                                      className="shapePreview__Path-sc-190zgsi-4 caiojl"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div className="shapePreview__Aspect-sc-190zgsi-0 htfVsC">
                              <div className="shapePreview__AspectInner-sc-190zgsi-1 hXCksd">
                                <button
                                  draggable="true"
                                  aria-label="Heart"
                                  className="shapePreview__ShapePreviewContainer-sc-190zgsi-2 IqIdB"
                                >
                                  <div className="shapePreview__ShapePreviewSizer-sc-190zgsi-3 jfsOxj" />
                                  <svg
                                    viewBox="0 0 1 0.9297712400000001"
                                    width="38.71920151025536"
                                    height={36}
                                  >
                                    <title>Heart</title>
                                    <path
                                      d="M.99834689.27724859C.98374997.1165844.87003101.00001922.7277144.00001922c-.0948137 0-.18162681.05102248-.23047608.13279699C.44883142.04998394.36557613 0 .27228183 0 .12998435 0 .01624632.1165652.00166847.27722932c-.00115382.007097-.00588463.0444451.00850059.10535296.0207321.0878518.06861968.1677608.13845102.23103404l.34838744.31615494.35436847-.31613565c.0698315-.0632926.1177191-.14318227.13845114-.23105333.0143856-.0608885.009655-.0982371.00852-.10533369 Z"
                                      className="shapePreview__Path-sc-190zgsi-4 caiojl"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div className="shapePreview__Aspect-sc-190zgsi-0 htfVsC">
                              <div className="shapePreview__AspectInner-sc-190zgsi-1 hXCksd">
                                <button
                                  draggable="true"
                                  aria-label="Star"
                                  className="shapePreview__ShapePreviewContainer-sc-190zgsi-2 IqIdB"
                                >
                                  <div className="shapePreview__ShapePreviewSizer-sc-190zgsi-3 jfsOxj" />
                                  <svg
                                    viewBox="0 0 1 0.9509999999999995"
                                    width="37.85488958990538"
                                    height={36}
                                  >
                                    <title>Star</title>
                                    <path
                                      d="M 0.50000026,0.78688566 0.19262278,0.95082018 0.2500004,0.6065577 0,0.36065594 0.34426194,0.31147556 0.50000026,0 0.65573858,0.31147556 1,0.36065594 0.75000014,0.6065577 0.80737774,0.95082018 Z"
                                      className="shapePreview__Path-sc-190zgsi-4 caiojl"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div className="shapePreview__Aspect-sc-190zgsi-0 htfVsC">
                              <div className="shapePreview__AspectInner-sc-190zgsi-1 hXCksd">
                                <button
                                  draggable="true"
                                  aria-label="Pentagon"
                                  className="shapePreview__ShapePreviewContainer-sc-190zgsi-2 IqIdB"
                                >
                                  <div className="shapePreview__ShapePreviewSizer-sc-190zgsi-3 jfsOxj" />
                                  <svg
                                    viewBox="0 0 1 0.9509999999999995"
                                    width="37.85488958990538"
                                    height={36}
                                  >
                                    <title>Pentagon</title>
                                    <path
                                      d="M 0.50000026,0 1,0.36065593 0.80737774,0.95082017 H 0.19262279 L 0,0.36065593 Z"
                                      className="shapePreview__Path-sc-190zgsi-4 caiojl"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div className="shapePreview__Aspect-sc-190zgsi-0 htfVsC">
                              <div className="shapePreview__AspectInner-sc-190zgsi-1 hXCksd">
                                <button
                                  draggable="true"
                                  aria-label="Hexagon"
                                  className="shapePreview__ShapePreviewContainer-sc-190zgsi-2 IqIdB"
                                >
                                  <div className="shapePreview__ShapePreviewSizer-sc-190zgsi-3 jfsOxj" />
                                  <svg
                                    viewBox="0 0 1 0.8660000000000002"
                                    width="41.5704387990762"
                                    height={36}
                                  >
                                    <title>Hexagon</title>
                                    <path
                                      d="m 0.74863333,0 h -0.494535 L 0,0.42896111 0.25409833,0.86611944 h 0.494535 L 1,0.42896111 Z"
                                      className="shapePreview__Path-sc-190zgsi-4 caiojl"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div className="shapePreview__Aspect-sc-190zgsi-0 htfVsC">
                              <div className="shapePreview__AspectInner-sc-190zgsi-1 hXCksd">
                                <button
                                  draggable="true"
                                  aria-label="Blob 1"
                                  className="shapePreview__ShapePreviewContainer-sc-190zgsi-2 IqIdB"
                                >
                                  <div className="shapePreview__ShapePreviewSizer-sc-190zgsi-3 jfsOxj" />
                                  <svg viewBox="0 0 1 1" width={36} height={36}>
                                    <title>Blob 1</title>
                                    <path
                                      d="M0.830816788,0.220786927 C0.875069274,0.303846138 0.868747722,0.386905348 0.900357103,0.469964559 C0.931968103,0.553023769 1.00150842,0.641273848 0.995186867,0.750290059 C0.995186867,0.854114072 0.925644932,0.973510691 0.818172064,0.994276822 C0.710699195,1.0150403 0.571615327,0.942364151 0.426211524,0.89045148 C0.280806103,0.838540138 0.135400682,0.817775335 0.0658587481,0.739906993 C-0.0100047388,0.667230848 -0.00368318612,0.542642033 0.0216062612,0.423244085 C0.0405709191,0.298655269 0.091146577,0.179257322 0.18597634,0.10138898 C0.287127656,0.0183297695 0.43885463,-0.0180076384 0.565293774,0.0131389011 C0.685411367,0.0390959011 0.78024113,0.132536848 0.830816788,0.220786927 Z"
                                      className="shapePreview__Path-sc-190zgsi-4 caiojl"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div className="shapePreview__Aspect-sc-190zgsi-0 htfVsC">
                              <div className="shapePreview__AspectInner-sc-190zgsi-1 hXCksd">
                                <button
                                  draggable="true"
                                  aria-label="Blob 2"
                                  className="shapePreview__ShapePreviewContainer-sc-190zgsi-2 IqIdB"
                                >
                                  <div className="shapePreview__ShapePreviewSizer-sc-190zgsi-3 jfsOxj" />
                                  <svg
                                    viewBox="0 0 1 0.9832387873857622"
                                    width="36.61368984"
                                    height={36}
                                  >
                                    <title>Blob 2</title>
                                    <path
                                      d="M 0.157040 , 0.886024 C 0.081227 , 0.837803 , 0.030944 , 0.761733 , 0.009541 , 0.687983 c -0.023724 -0.081485 -0.006704 -0.152140 , 0.084580 -0.190562 c 0.095152 -0.039969 , 0.144404 -0.089479 , 0.182568 -0.125322 c 0.069108 -0.064724 , 0.073749 -0.121196 , 0.101857 -0.181795 c 0.021919 -0.047189 , 0.063950 -0.091542 , 0.161939 -0.142084 c 0.095926 -0.049510 , 0.175090 -0.063693 , 0.240330 -0.028623 c 0.056730 , 0.030428 , 0.102114 , 0.097473 , 0.142341 , 0.194172 c 0.025529 , 0.060598 , 0.044611 , 0.135121 , 0.065498 , 0.222537 c 0.016503 , 0.070139 , 0.014183 , 0.134605 -0.004126 , 0.194430 c -0.019082 , 0.062919 -0.045900 , 0.125580 -0.096699 , 0.172254 c -0.047705 , 0.043837 -0.119907 , 0.065498 -0.190046 , 0.091542 c -0.069881 , 0.025786 -0.122744 , 0.055441 -0.173801 , 0.068076 c -0.072976 , 0.017793 -0.134348 , 0.028107 -0.193914 , 0.014956 C 0.276173 , 0.965188 , 0.224342 , 0.928314 , 0.157040 , 0.886024 z"
                                      className="shapePreview__Path-sc-190zgsi-4 caiojl"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div className="shapePreview__Aspect-sc-190zgsi-0 htfVsC">
                              <div className="shapePreview__AspectInner-sc-190zgsi-1 hXCksd">
                                <button
                                  draggable="true"
                                  aria-label="Blob 3"
                                  className="shapePreview__ShapePreviewContainer-sc-190zgsi-2 IqIdB"
                                >
                                  <div className="shapePreview__ShapePreviewSizer-sc-190zgsi-3 jfsOxj" />
                                  <svg
                                    viewBox="0 0 1 1.1117302089593648"
                                    width="32.38195716"
                                    height={36}
                                  >
                                    <title>Blob 3</title>
                                    <path
                                      d="M 0.205572 , 1.093842 c -0.054252 -0.008798 -0.099413 -0.059824 -0.138710 -0.124340 c -0.033431 -0.054545 -0.055718 -0.117009 -0.063050 -0.179472 c -0.008211 -0.072727 -0.007038 -0.144575 , 0.040762 -0.183578 C 0.119648 , 0.545455 , 0.165396 , 0.498827 , 0.191789 , 0.454545 c 0.047507 -0.080059 , 0.043109 -0.137830 , 0.056012 -0.204106 c 0.009971 -0.051906 , 0.027566 -0.112023 , 0.102933 -0.184457 c 0.041056 -0.039589 , 0.110264 -0.059238 , 0.183578 -0.064809 c 0.062170 -0.004692 , 0.129326 , 0.005572 , 0.193255 , 0.024340 c 0.064809 , 0.018768 , 0.124047 , 0.048974 , 0.170968 , 0.090323 c 0.049267 , 0.043988 , 0.094135 , 0.097654 , 0.100587 , 0.165982 c 0.005279 , 0.055132 -0.024927 , 0.114663 -0.060997 , 0.184751 c -0.058065 , 0.112610 -0.068328 , 0.188563 -0.080352 , 0.247801 c -0.016716 , 0.080938 -0.010264 , 0.143109 -0.067449 , 0.252199 c -0.030792 , 0.058944 -0.102053 , 0.082405 -0.175367 , 0.105279 c -0.061877 , 0.019648 -0.130205 , 0.038710 -0.202346 , 0.039589 C 0.340762 , 1.112903 , 0.268622 , 1.104106 , 0.205572 , 1.093842 z"
                                      className="shapePreview__Path-sc-190zgsi-4 caiojl"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div className="shapePreview__Aspect-sc-190zgsi-0 htfVsC">
                              <div className="shapePreview__AspectInner-sc-190zgsi-1 hXCksd">
                                <button
                                  draggable="true"
                                  aria-label="Blob 4"
                                  className="shapePreview__ShapePreviewContainer-sc-190zgsi-2 IqIdB"
                                >
                                  <div className="shapePreview__ShapePreviewSizer-sc-190zgsi-3 jfsOxj" />
                                  <svg
                                    viewBox="0 0 1 0.9563704471470814"
                                    width="37.64231748"
                                    height={36}
                                  >
                                    <title>Blob 4</title>
                                    <path
                                      d="M 0.989829 , 0.233137 C 0.935760 -0.017398 , 0.663544 , 0.008298 , 0.544165 , 0.000000 C 0.259101 , 0.020878 , 0.182281 , 0.213330 , 0.029443 , 0.604122 c -0.153105 , 0.391060 , 0.334315 , 0.384101 , 0.461456 , 0.317719 c 0.071734 -0.037473 , 0.283726 -0.132227 , 0.327623 -0.167827 C 0.862687 , 0.718415 , 1.044165 , 0.483940 , 0.989829 , 0.233137 z"
                                      className="shapePreview__Path-sc-190zgsi-4 caiojl"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div className="shapePreview__Aspect-sc-190zgsi-0 htfVsC">
                              <div className="shapePreview__AspectInner-sc-190zgsi-1 hXCksd">
                                <button
                                  draggable="true"
                                  aria-label="Blob 5"
                                  className="shapePreview__ShapePreviewContainer-sc-190zgsi-2 IqIdB"
                                >
                                  <div className="shapePreview__ShapePreviewSizer-sc-190zgsi-3 jfsOxj" />
                                  <svg
                                    viewBox="0 0 1 1.0716253486332141"
                                    width="33.5938302"
                                    height={36}
                                  >
                                    <title>Blob 5</title>
                                    <path
                                      d="M 0.156198 , 0.447658 c 0.151515 -0.094766 , 0.054821 -0.194766 , 0.090634 -0.290634 c 0.113774 -0.373829 , 0.543251 , 0.000000 , 0.702204 , 0.290634 C 1.107989 , 0.738292 , 0.859504 , 0.922865 , 0.700551 , 1.024793 c -0.158953 , 0.102204 -0.196970 , 0.026446 -0.304132 -0.126446 S 0.097245 , 0.836364 , 0.030854 , 0.722590 C -0.035537 , 0.608815 , 0.004683 , 0.542424 , 0.156198 , 0.447658 z"
                                      className="shapePreview__Path-sc-190zgsi-4 caiojl"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </section>
                </div>
              </div>
            </div>
            <div className="layout__Area-sc-18lijnv-0 layout__CanvasArea-sc-18lijnv-1 hqmQtO">
              <section
                aria-label="Canvas"
                className="canvasLayout__Background-vb6mwq-0 grcWsi"
                style={{
                  width: "268px",
                  height: "402px",
                  maxWidth: "268px",
                  maxHeight: "476.444px",
                }}
              >
                <div className="dropTarget__DropTargetComponent-lfrfde-0 kkvmxN">
                  <div className="dropTarget__Content-lfrfde-1 gLekvi">
                    <div className="canvasElementDropzone__Container-sc-4u2gu4-0 iYCnnz">
                      <div className="selectionCanvas__Container-ao9m22-0 cJtVDI">
                        <section
                          data-testid="DisplayLayer"
                          pointerEvents="none"
                          aria-label="Display layer"
                          className="layout__Layer-sc-99rnh0-0 ecqXyt"
                        >
                          <div
                            data-testid="fullbleed"
                            aria-label="Fullbleed area"
                            role="region"
                            className="layout__Area-sc-99rnh0-1 layout__PageAreaFullbleedContainer-sc-99rnh0-2 lnpYBp dkBgEa"
                          >
                            <div className="layout__PageAreaWithOverflow-sc-99rnh0-3 bsomvN">
                              <div
                                data-testid="safezone"
                                className="layout__PageAreaSafeZone-sc-99rnh0-4 cbjXcg"
                              >
                                <div
                                  data-element-id="17a0aedd-72fe-4544-9d76-e708c45fe94f"
                                  x={0}
                                  y="-37.22222"
                                  width={268}
                                  height="476.44444"
                                  className="displayElement__Wrapper-sc-143lj7s-0 dPXOhF"
                                >
                                  <div
                                    style={{
                                      position: "absolute",
                                      inset: "0px",
                                      opacity: 1,
                                    }}
                                  >
                                    <svg width={0} height={0}>
                                      <defs>
                                        <clipPath
                                          id="mask-rectangle-17a0aedd-72fe-4544-9d76-e708c45fe94f-display"
                                          transform="scale(1 1)"
                                          clipPathUnits="objectBoundingBox"
                                        >
                                          <path d="M 0,0 1,0 1,1 0,1 0,0 Z" />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                    <div className="display__Element-sc-1jzvi5q-0 fDiTyI" />
                                  </div>
                                  <div className="displayElement__ReplacementContainer-sc-143lj7s-2 lmkVmu" />
                                </div>
                              </div>
                            </div>
                            <div
                              role="presentation"
                              className="pageAttachment__Wrapper-sc-5p57k-0 bYIqgH"
                            />
                          </div>
                        </section>
                        <section
                          data-testid="FramesLayer"
                          pointerEvents="none"
                          tabIndex={-1}
                          aria-label="Frames layer"
                          className="layout__Layer-sc-99rnh0-0 ecqXyt"
                        >
                          <div
                            data-testid="fullbleed"
                            aria-label="Fullbleed area"
                            role="region"
                            className="layout__Area-sc-99rnh0-1 layout__PageAreaFullbleedContainer-sc-99rnh0-2 lnpYBp dkBgEa"
                          >
                            <div className="layout__PageAreaWithOverflow-sc-99rnh0-3 jCuGpG">
                              <div
                                data-testid="safezone"
                                className="layout__PageAreaSafeZone-sc-99rnh0-4 cCyfts"
                              >
                                <div
                                  data-element-id="17a0aedd-72fe-4544-9d76-e708c45fe94f"
                                  x={0}
                                  y="-37.22222"
                                  width={268}
                                  height="476.44444"
                                  tabIndex={0}
                                  aria-labelledby="layer-17a0aedd-72fe-4544-9d76-e708c45fe94f"
                                  data-testid="frameElement"
                                  className="frameElement__Wrapper-sc-1pyee9f-0 fgQSaY"
                                >
                                  <div
                                    style={{
                                      position: "absolute",
                                      inset: "0px",
                                    }}
                                  >
                                    <svg width={0} height={0}>
                                      <defs>
                                        <clipPath
                                          id="mask-rectangle-17a0aedd-72fe-4544-9d76-e708c45fe94f-frame"
                                          transform="scale(1 1)"
                                          clipPathUnits="objectBoundingBox"
                                        >
                                          <path d="M 0,0 1,0 1,1 0,1 0,0 Z" />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                    <div className="frameElement__EmptyFrame-sc-1pyee9f-1 bdgruZ" />
                                    <svg
                                      viewBox="0 0 1 1"
                                      width="100%"
                                      height="100%"
                                      preserveAspectRatio="none"
                                      className="frame__DropTargetSVG-dphwi8-0 hguPUl"
                                    >
                                      <path
                                        vectorEffect="non-scaling-stroke"
                                        strokeWidth={4}
                                        fill="none"
                                        stroke="#0063F9"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M 0,0 1,0 1,1 0,1 0,0 Z"
                                        className="frame__DropTargetPath-dphwi8-1 bnyvvD"
                                        style={{}}
                                      />
                                      <path
                                        vectorEffect="non-scaling-stroke"
                                        strokeWidth={48}
                                        fill="none"
                                        stroke="#0063F9"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M 0,0 1,0 1,1 0,1 0,0 Z"
                                        className="frame__DropTargetPath-dphwi8-1 bnyvvD"
                                      />
                                    </svg>
                                  </div>
                                </div>
                                <div className="framesLayer__DesignSpaceGuideline-sc-1kchay5-3 bbbjjR" />
                                <div className="withOverlay__Overlay-sc-1edt0nz-0 gDNRfO" />
                              </div>
                            </div>
                          </div>
                          <div
                            pointerEvents="initial"
                            className="layout__Area-sc-99rnh0-1 layout__MenuArea-sc-99rnh0-6 chsfPx"
                          >
                            <div className="pagemenu__Wrapper-sc-1nc48ij-0 enuEFs">
                              <div className="pagemenu__Box-sc-1nc48ij-1 hSRXSz">
                                <div className="pagemenu__Options-sc-1nc48ij-3 ibHse">
                                  <div className="tooltip__Wrapper-i6bouk-0 ivrLEb">
                                    <button
                                      aria-label="Delete Page"
                                      className="pagemenu__Icon-sc-1nc48ij-6 gBdUDD"
                                    >
                                      <svg fill="none" viewBox="0 0 24 24">
                                        <path
                                          fill="currentColor"
                                          fillRule="evenodd"
                                          d="M14.5 3h-5l-1 1H5v2h14V4h-3.5l-1-1zM16 9v10H8V9h8zM6 7h12v12c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V7z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                  <div className="pagemenu__Space-sc-1nc48ij-5 uyQzi" />
                                  <div className="tooltip__Wrapper-i6bouk-0 ivrLEb">
                                    <button
                                      aria-label="Duplicate Page"
                                      className="pagemenu__Icon-sc-1nc48ij-6 gBdUDD"
                                    >
                                      <svg fill="none" viewBox="0 0 24 24">
                                        <path
                                          fill="currentColor"
                                          d="M14.125 8h-1.25v1.875H11v1.25h1.875V13h1.25v-1.875H16v-1.25h-1.875V8z"
                                        />
                                        <path
                                          stroke="currentColor"
                                          strokeWidth={2}
                                          d="M8 5a1 1 0 011-1h9a1 1 0 011 1v11a1 1 0 01-1 1H9a1 1 0 01-1-1V5z"
                                        />
                                        <path
                                          stroke="currentColor"
                                          strokeWidth={2}
                                          d="M5 5v13a2 2 0 002 2h11"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                  <div className="pagemenu__Space-sc-1nc48ij-5 uyQzi" />
                                  <div className="tooltip__Wrapper-i6bouk-0 ivrLEb">
                                    <button
                                      aria-label="Add New Page"
                                      className="pagemenu__Icon-sc-1nc48ij-6 gBdUDD"
                                    >
                                      <svg fill="none" viewBox="0 0 28 28">
                                        <path
                                          fill="currentColor"
                                          d="M21 15h-6v6h-2v-6H7v-2h6V7h2v6h6v2z"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                  <div className="pagemenu__Space-sc-1nc48ij-5 uyQzi" />
                                  <span className="pagemenu__Divider-sc-1nc48ij-4 bcvhwY" />
                                  <div className="pagemenu__Space-sc-1nc48ij-5 uyQzi" />
                                  <div className="tooltip__Wrapper-i6bouk-0 ivrLEb">
                                    <button
                                      disabled
                                      aria-label="Undo Changes"
                                      className="pagemenu__Icon-sc-1nc48ij-6 ekWFlQ"
                                    >
                                      <svg fill="none" viewBox="0 0 24 24">
                                        <path
                                          fill="currentColor"
                                          d="M12.266 8.5c-2.65 0-5.05.99-6.9 2.6l-3.6-3.6v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78c-1.39-4.19-5.32-7.22-9.97-7.22z"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                  <div className="pagemenu__Space-sc-1nc48ij-5 uyQzi" />
                                  <div className="tooltip__Wrapper-i6bouk-0 ivrLEb">
                                    <button
                                      disabled
                                      aria-label="Redo Changes"
                                      className="pagemenu__Icon-sc-1nc48ij-6 ekWFlQ"
                                    >
                                      <svg fill="none" viewBox="0 0 24 24">
                                        <path
                                          fill="currentColor"
                                          d="M18.63 11.1c-1.85-1.61-4.25-2.6-6.9-2.6-4.65 0-8.58 3.03-9.96 7.22l2.36.78a8.002 8.002 0 017.6-5.5c1.95 0 3.73.72 5.12 1.88l-3.62 3.62h9v-9l-3.6 3.6z"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                  <div className="pagemenu__Space-sc-1nc48ij-5 uyQzi" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="layout__Area-sc-99rnh0-1 layout__NavArea-sc-99rnh0-7 layout__NavPrevArea-sc-99rnh0-8 rEkvP ejGThn">
                            <div className="pagenav__Wrapper-cqdtsp-0 cticff">
                              <button
                                aria-label="Previous Page"
                                width={40}
                                height={40}
                                className="button__Base-uaxtbg-0 button__StyledButton-uaxtbg-1 button__StyledButtonWithOpacity-uaxtbg-2 hlfXqc yxnyS gETcC pagenav__LeftNavButton-cqdtsp-1 elOBZX"
                                disabled
                              >
                                <svg fill="none" viewBox="0 0 8 16">
                                  <path
                                    stroke="currentColor"
                                    d="M7.56.96L1.16 8l6.4 7.04"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div className="layout__Area-sc-99rnh0-1 layout__NavArea-sc-99rnh0-7 layout__NavNextArea-sc-99rnh0-9 MvSPN ejGThn">
                            <div className="pagenav__Wrapper-cqdtsp-0 cticff">
                              <button
                                aria-label="Next Page"
                                width={40}
                                height={40}
                                className="button__Base-uaxtbg-0 button__StyledButton-uaxtbg-1 button__StyledButtonWithOpacity-uaxtbg-2 hlfXqc yxnyS gETcC pagenav__RightNavButton-cqdtsp-2 bLcFDX"
                                disabled
                              >
                                <svg fill="none" viewBox="0 0 8 16">
                                  <path
                                    stroke="currentColor"
                                    d="M.44.96L6.84 8l-6.4 7.04"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </section>
                        <section
                          pointerEvents="none"
                          className="layout__Layer-sc-99rnh0-0 kTqvSz"
                        >
                          <div
                            pointerEvents="initial"
                            className="layout__Area-sc-99rnh0-1 layout__HeadArea-sc-99rnh0-5 fepIEQ"
                          >
                            <header
                              role="group"
                              aria-label="Story canvas header"
                              className="headerLayout__Background-sc-1xzwqdn-0 kYeTny"
                            >
                              <div className="headerLayout__Head-sc-1xzwqdn-1 elMBSn">
                                <input
                                  type="text"
                                  placeholder="Add title"
                                  aria-label="Edit: Story title"
                                  className="title__Input-sc-1425urd-0 kLQxSz"
                                  defaultValue="Untitled"
                                />
                              </div>
                              <div className="headerLayout__ButtonCell-sc-1xzwqdn-2 bqjrOg">
                                <nav className="buttons__ButtonList-pc7i0l-0 dfwbYR">
                                  <div className="buttons__List-pc7i0l-1 flXWau">
                                    <div className="buttons__Space-pc7i0l-2 jRLRQz" />
                                    <button
                                      className="button__Base-uaxtbg-0 button__OutlineButton-uaxtbg-5 hlfXqc gXhVZs"
                                      disabled
                                    >
                                      Save draft
                                    </button>
                                    <div className="buttons__Space-pc7i0l-2 jRLRQz" />
                                    <button className="button__Base-uaxtbg-0 button__OutlineButton-uaxtbg-5 gvavBk gXhVZs">
                                      Preview
                                    </button>
                                    <div className="buttons__Space-pc7i0l-2 jRLRQz" />
                                    <button className="button__Base-uaxtbg-0 button__PrimaryButton-uaxtbg-3 gvavBk fgfJqH">
                                      Publish
                                    </button>
                                    <div className="buttons__Space-pc7i0l-2 jRLRQz" />
                                  </div>
                                </nav>
                              </div>
                            </header>
                          </div>
                          <div
                            pointerEvents="initial"
                            className="layout__Area-sc-99rnh0-1 layout__CarouselArea-sc-99rnh0-10 fThPxc"
                          >
                            <section
                              data-testid="PageCarousel"
                              aria-label="Page Carousel"
                              data-ready="true"
                              className="carousel__Wrapper-sc-3zfkwj-0 hHPdg"
                            >
                              <div className="carousel__Area-sc-3zfkwj-1 carousel__NavArea-sc-3zfkwj-2 bjdoSe fuvXdE" />
                              <div className="carousel__Area-sc-3zfkwj-1 carousel__NavArea-sc-3zfkwj-2 jWoVNk jQhAIA">
                                <button
                                  width={24}
                                  height={24}
                                  aria-label="Scroll Backward"
                                  className="button__Base-uaxtbg-0 button__StyledButton-uaxtbg-1 button__StyledButtonWithOpacity-uaxtbg-2 gvavBk kWiGoe gETcC"
                                >
                                  <svg fill="none" viewBox="0 0 8 16">
                                    <path
                                      stroke="currentColor"
                                      d="M7.56.96L1.16 8l6.4 7.04"
                                    />
                                  </svg>
                                </button>
                              </div>
                              <div
                                aria-label="Pages List"
                                role="listbox"
                                aria-orientation="horizontal"
                                className="reorderable__ReorderableContainer-jpkbzc-0 jBBJrk carousel__PageList-sc-3zfkwj-10 kSlBtT"
                              >
                                <div className="carousel__ItemContainer-sc-3zfkwj-13 juslRR">
                                  <div
                                    width="16.770833333333332"
                                    height="35.15625"
                                    className="reorderableSeparator__Wrapper-sc-1ycdduq-0 dwIXUA carousel__PageSeparator-sc-3zfkwj-11 cFHdew"
                                  >
                                    <div
                                      height="35.15625"
                                      className="carousel__Line-sc-3zfkwj-12 feyKED"
                                    />
                                  </div>
                                  <div
                                    role="option"
                                    className="reorderableItem__Container-usleen-0 kuWiEo carousel__ReorderablePage-sc-3zfkwj-14 bSmQoQ"
                                  >
                                    <button
                                      tabIndex={-1}
                                      role="option"
                                      data-page-id="faadd3b2-bc09-48e2-9ab1-9484bc849a44"
                                      aria-label="Page 1 (current page)"
                                      width="16.770833333333332"
                                      height="35.15625"
                                      className="compactIndicator__CompactIndicator-sc-1npu08q-0 kIpysP"
                                    />
                                  </div>
                                  <div
                                    width="16.770833333333332"
                                    height="35.15625"
                                    className="reorderableSeparator__Wrapper-sc-1ycdduq-0 dwIXUA carousel__PageSeparator-sc-3zfkwj-11 cFHdew"
                                  >
                                    <div
                                      height="35.15625"
                                      className="carousel__Line-sc-3zfkwj-12 feyKED"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="carousel__Area-sc-3zfkwj-1 carousel__NavArea-sc-3zfkwj-2 jWqDqa jQhAIA">
                                <button
                                  width={24}
                                  height={24}
                                  aria-label="Scroll Forward"
                                  className="button__Base-uaxtbg-0 button__StyledButton-uaxtbg-1 button__StyledButtonWithOpacity-uaxtbg-2 gvavBk kWiGoe gETcC"
                                >
                                  <svg fill="none" viewBox="0 0 8 16">
                                    <path
                                      stroke="currentColor"
                                      d="M.44.96L6.84 8l-6.4 7.04"
                                    />
                                  </svg>
                                </button>
                              </div>
                              <div className="carousel__Area-sc-3zfkwj-1 carousel__MenuArea-sc-3zfkwj-3 fAEmKZ">
                                <div className="carousel__MenuIconsWrapper-sc-3zfkwj-6 erOtQt">
                                  <div className="carousel__OverflowButtons-sc-3zfkwj-7 embpwb">
                                    <div className="tooltip__Wrapper-i6bouk-0 ivrLEb">
                                      <button
                                        width={24}
                                        height={24}
                                        aria-pressed="false"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        aria-label="Open Keyboard Shortcuts"
                                        className="button__Base-uaxtbg-0 button__StyledButton-uaxtbg-1 gvavBk bIuJqi"
                                      >
                                        <svg fill="none" viewBox="0 0 24 18">
                                          <path
                                            clipRule="evenodd"
                                            d="M21.334.832H2.667A2.33 2.33 0 00.346 3.165L.334 14.832a2.34 2.34 0 002.333 2.333h18.667a2.34 2.34 0 002.333-2.333V3.165A2.34 2.34 0 0021.334.832zm0 2.333v11.667H2.667V3.165zm-8.167 1.167h-2.333v2.333h2.333zm-2.333 3.5h2.333v2.333h-2.333zm-1.167-3.5H7.334v2.333h2.333zm-2.333 3.5h2.333v2.333H7.334zm-1.167 0H3.834v2.333h2.333zm-2.333-3.5h2.333v2.333H3.834zm12.833 7H7.334v2.333h9.333zm-2.333-3.5h2.333v2.333h-2.333zm2.333-3.5h-2.333v2.333h2.333zm1.167 3.5h2.333v2.333h-2.333zm2.333-3.5h-2.333v2.333h2.333z"
                                            fill="#fff"
                                            fillRule="evenodd"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                  <div className="tooltip__Wrapper-i6bouk-0 ivrLEb">
                                    <div className="toggleButton__Container-w9hcvf-2 cuLUQp carousel__SafeZoneToggle-sc-3zfkwj-9 hda-Dit">
                                      <label
                                        value="true"
                                        className="toggleButton__ContainerLabel-w9hcvf-4 egTiRK"
                                      >
                                        <input
                                          aria-label="Disable Safe Zone"
                                          type="checkbox"
                                          className="toggleButton__CheckBoxInput-w9hcvf-0 kwGvXt mousetrap"
                                          defaultChecked
                                        />
                                        <span className="toggleButton__MarkSpan-w9hcvf-1 eSSNwI">
                                          <svg viewBox="0 0 28 28" fill="none">
                                            <path
                                              d="M9 7a1 1 0 011-1h9a1 1 0 011 1v14a1 1 0 01-1 1h-9a1 1 0 01-1-1V7z"
                                              stroke="currentColor"
                                              strokeWidth={2}
                                            />
                                            <path
                                              fill="currentColor"
                                              d="M11 9h3v1h-3zM15 9h3v1h-3z"
                                            />
                                          </svg>
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div className="tooltip__Wrapper-i6bouk-0 ivrLEb">
                                    <button
                                      aria-label="Grid View"
                                      height={24}
                                      width={24}
                                      className="button__Base-uaxtbg-0 button__StyledButton-uaxtbg-1 gvavBk bIuJqi carousel__StyledGridViewButton-sc-3zfkwj-8 inpnuV"
                                    >
                                      <svg fill="none" viewBox="0 0 28 28">
                                        <path
                                          stroke="currentColor"
                                          strokeWidth="1.302"
                                          d="M.651.651h10.698v10.698H.651zM16.651.651h10.698v10.698H16.651zM.651 16.651h10.698v10.698H.651zM16.651 16.651h10.698v10.698H16.651z"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </section>
                            <div className="carousel__EditorVersion-sc-3zfkwj-4 ePSpIq">
                              Version{" "}
                            </div>
                          </div>
                        </section>
                        <div className="withOverlay__Overlay-sc-1edt0nz-0 gDNRfO">
                          <div className="overlay__Wrapper-sc-1plef62-0 kGWJbl">
                            <div
                              className="selectionCanvas__Lasso-ao9m22-1 hiqRsi"
                              style={{
                                left: "747px",
                                top: "142px",
                                width: "0px",
                                height: "0px",
                                display: "none",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="layout__Area-sc-18lijnv-0 layout__InspectorArea-sc-18lijnv-2 hZumEb">
              <div className="dropTarget__DropTargetComponent-lfrfde-0 kkvmxN">
                <div className="dropTarget__Content-lfrfde-1 gLekvi">
                  <section
                    aria-label="Inspector"
                    className="inspectorLayout__Layout-qzehua-0 evNmGY"
                  >
                    <ul
                      aria-label="Inspector Selection"
                      role="tablist"
                      aria-orientation="horizontal"
                      className="tabview__Tabs-sc-16p5pbf-0 biFIIm"
                    >
                      <li
                        id="design"
                        aria-controls="inspector-tab-design"
                        aria-selected="true"
                        tabIndex={0}
                        role="tab"
                        className="tabview__Tab-sc-16p5pbf-1 bVUIGH"
                      >
                        Design
                      </li>
                      <li
                        id="document"
                        aria-controls="inspector-tab-document"
                        aria-selected="false"
                        tabIndex={-1}
                        role="tab"
                        className="tabview__Tab-sc-16p5pbf-1 fRXvxj"
                      >
                        Document
                      </li>
                    </ul>
                    <div className="inspectorLayout__InspectorContainer-qzehua-1 jtHdeT">
                      <section className="inspectorContent__InspectorPanes-sc-1wk5xki-1 iLyaBb">
                        <div
                          aria-labelledby="design"
                          id="inspector-tab-design"
                          role="tabpanel"
                          className="inspectorContent__InspectorPane-sc-1wk5xki-0 kEPuKF"
                        >
                          <div className="designInspector__Wrapper-l21qv9-0 fQQGTu">
                            <div className="designInspector__TopPanels-l21qv9-1 cfepDq">
                              <form className="designPanel__Form-sc-16mked2-0 enODhI">
                                <input
                                  type="submit"
                                  className="designPanel__AutoSubmitButton-sc-16mked2-1 kcDOuu"
                                />
                                <section
                                  aria-hidden="false"
                                  className="panel__Wrapper-szdgup-0 hmcNxn"
                                >
                                  <div
                                    id="panel-noselection-3895a84c-1105-46c1-a9dc-a12ba871b2f5"
                                    className="content__Container-sc-1dkmdq8-0 jlpbOa"
                                    style={{ height: "auto" }}
                                  >
                                    <p className="noSelection__Note-sc-3cv1m1-0 hRkSYe">
                                      Nothing selected
                                    </p>
                                  </div>
                                </section>
                              </form>
                            </div>
                            <div className="designInspector__BottomPanels-l21qv9-2 ipmtlx">
                              <section
                                aria-hidden="true"
                                className="panel__Wrapper-szdgup-0 hmcNxn"
                                aria-labelledby="panel-title-layers-29790335-d788-492a-8102-f04603483538"
                              >
                                <h2 className="title__Header-sc-19dzewg-0 GRCIq">
                                  <div className="handle__Handle-kzvfse-0 hIlCcV">
                                    <div
                                      role="slider"
                                      aria-orientation="vertical"
                                      aria-valuenow={40}
                                      aria-valuemin={0}
                                      aria-valuemax={447}
                                      aria-label="Set panel height"
                                      tabIndex={-1}
                                      className="handle__Bar-kzvfse-1 yfvEv"
                                    />
                                  </div>
                                  <div
                                    role="button"
                                    className="title__HeaderButton-sc-19dzewg-1 comBRj"
                                  >
                                    <span
                                      id="panel-title-layers-29790335-d788-492a-8102-f04603483538"
                                      className="title__Heading-sc-19dzewg-2 fbGkuh"
                                    >
                                      Layers
                                    </span>
                                    <div className="title__HeaderActions-sc-19dzewg-3 cqYvOC">
                                      <button
                                        aria-label="Collapse panel"
                                        aria-expanded="true"
                                        aria-controls="panel-layers-f1798a10-f079-4f47-a1d0-2cd202e9e9fb"
                                        tabIndex={-1}
                                        className="title__Collapse-sc-19dzewg-4 kyatlx"
                                      >
                                        <svg fill="none" viewBox="0 0 28 28">
                                          <path
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            d="M19 16l-5-4-5 4"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </h2>
                                <div
                                  id="panel-layers-f1798a10-f079-4f47-a1d0-2cd202e9e9fb"
                                  className="content__Container-sc-1dkmdq8-0 crIrEX"
                                  style={{ height: "40px" }}
                                >
                                  <div
                                    aria-orientation="vertical"
                                    aria-label="Layers List"
                                    className="reorderable__ReorderableContainer-jpkbzc-0 jBBJrk layerList__LayerList-sc-1lbmnc5-0 cFlPUZ"
                                    role="listbox"
                                  >
                                    <div className="reorderableSeparator__Wrapper-sc-1ycdduq-0 dwIXUA layerList__LayerSeparator-sc-1lbmnc5-1 cddBoI">
                                      <div className="reorderableSeparator__Line-sc-1ycdduq-1 jqnBrC" />
                                    </div>
                                    <div className="reorderableItem__Container-usleen-0 kuWiEo">
                                      <button
                                        id="layer-17a0aedd-72fe-4544-9d76-e708c45fe94f"
                                        type="button"
                                        tabIndex={-1}
                                        role="option"
                                        data-testid="layer-option"
                                        className="layer__LayerButton-sc-18ebmzf-0 gzKwti"
                                      >
                                        <div className="layer__LayerIconWrapper-sc-18ebmzf-1 eKRvAY">
                                          <svg
                                            viewBox="0 0 15 15"
                                            aria-label="Background element"
                                            className="layer__LockedIcon-sc-18ebmzf-3 gNuZjC"
                                          >
                                            <path
                                              d="M10.926 4.992l.687-.002c.755 0 1.374.64 1.375 1.426l.012 7.14c.001.785-.616 1.428-1.371 1.43L3.387 15c-.755.001-1.374-.64-1.375-1.426L2 6.435c-.001-.785.616-1.429 1.371-1.43l.687-.001-.002-1.428C4.053 1.606 5.588.003 7.484 0c1.895-.003 3.436 1.593 3.44 3.564l.002 1.428zm-3.44-3.564c-1.14.002-2.059.96-2.057 2.145l.003 1.428 4.12-.007-.002-1.428c-.002-1.185-.924-2.14-2.064-2.138zm-4.1 12.144l-.012-7.14 8.241-.014.011 7.14-8.24.014zm5.488-3.58c0 .786-.616 1.43-1.372 1.431-.755.001-1.374-.64-1.376-1.425 0-.786.616-1.43 1.372-1.43.755-.002 1.374.64 1.376 1.425z"
                                              fill="currentColor"
                                              fillRule="evenodd"
                                            />
                                          </svg>
                                        </div>
                                        <div className="layer__LayerDescription-sc-18ebmzf-2 eNblK">
                                          <div className="layer__BackgroundDescription-sc-18ebmzf-4 dDvDAw">
                                            Background (locked)
                                          </div>
                                        </div>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </section>
                            </div>
                          </div>
                        </div>
                        <div
                          aria-labelledby="document"
                          id="inspector-tab-document"
                          hidden
                          role="tabpanel"
                          className="inspectorContent__InspectorPane-sc-1wk5xki-0 kEPuKF"
                        >
                          <section
                            aria-hidden="false"
                            className="panel__Wrapper-szdgup-0 hmcNxn"
                            aria-labelledby="panel-title-excerpt-b8a17da6-782f-4749-b459-372da35657f4"
                          >
                            <h2 className="title__Header-sc-19dzewg-0 fZHMbn">
                              <div
                                role="button"
                                className="title__HeaderButton-sc-19dzewg-1 comBRj"
                              >
                                <span
                                  id="panel-title-excerpt-b8a17da6-782f-4749-b459-372da35657f4"
                                  className="title__Heading-sc-19dzewg-2 fbGkuh"
                                >
                                  Excerpt
                                </span>
                                <div className="title__HeaderActions-sc-19dzewg-3 cqYvOC">
                                  <button
                                    aria-label="Collapse panel"
                                    aria-expanded="true"
                                    aria-controls="panel-excerpt-1523ae07-b7a1-453f-83e8-427414702c6f"
                                    tabIndex={0}
                                    className="title__Collapse-sc-19dzewg-4 kyatlx"
                                  >
                                    <svg fill="none" viewBox="0 0 28 28">
                                      <path
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        d="M19 16l-5-4-5 4"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </h2>
                            <div
                              id="panel-excerpt-1523ae07-b7a1-453f-83e8-427414702c6f"
                              className="content__Container-sc-1dkmdq8-0 hSPOgK"
                              style={{ height: "auto" }}
                            >
                              <div className="row__Row-sc-1nodxmc-0 jyNboj">
                                <div className="textArea__Container-sc-11bdagt-1 dDNGTc">
                                  <textarea
                                    placeholder="Write an excerpt"
                                    maxLength={200}
                                    rows={4}
                                    aria-label="Edit: Story Excerpt"
                                    className="textArea__StyledTextArea-sc-11bdagt-0 hlRNoO"
                                    defaultValue={""}
                                  />
                                  <div className="textArea__Counter-sc-11bdagt-2 edLMCK">
                                    0/200
                                  </div>
                                </div>
                              </div>
                              <div className="row__Row-sc-1nodxmc-0 jyNboj">
                                <span className="note__NoteContainer-sc-1kxfuaz-0 eKEyQX">
                                  Stories with an excerpt tend to do better on
                                  search and have a wider reach.
                                </span>
                              </div>
                            </div>
                          </section>
                          <section
                            aria-hidden="false"
                            className="panel__Wrapper-szdgup-0 hmcNxn"
                            aria-labelledby="panel-title-pageAdvancement-496c9207-160a-460c-a257-1fe0b893ee53"
                          >
                            <h2 className="title__Header-sc-19dzewg-0 fZHMbn">
                              <div
                                role="button"
                                className="title__HeaderButton-sc-19dzewg-1 comBRj"
                              >
                                <span
                                  id="panel-title-pageAdvancement-496c9207-160a-460c-a257-1fe0b893ee53"
                                  className="title__Heading-sc-19dzewg-2 fbGkuh"
                                >
                                  Page Advancement
                                </span>
                                <div className="title__HeaderActions-sc-19dzewg-3 cqYvOC">
                                  <button
                                    aria-label="Collapse panel"
                                    aria-expanded="true"
                                    aria-controls="panel-pageAdvancement-0d2d86ca-b232-49ba-876f-7a767cb1fef6"
                                    tabIndex={0}
                                    className="title__Collapse-sc-19dzewg-4 kyatlx"
                                  >
                                    <svg fill="none" viewBox="0 0 28 28">
                                      <path
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        d="M19 16l-5-4-5 4"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </h2>
                            <div
                              id="panel-pageAdvancement-0d2d86ca-b232-49ba-876f-7a767cb1fef6"
                              className="content__Container-sc-1dkmdq8-0 hSPOgK"
                              style={{ height: "auto" }}
                            >
                              <div className="row__Row-sc-1nodxmc-0 jyNboj">
                                <span className="note__NoteContainer-sc-1kxfuaz-0 eKEyQX">
                                  Control whether a story auto-advances between
                                  pages, or whether the reader has to manually
                                  tap to advance.
                                </span>
                              </div>
                              <div className="pageAdvancement__SwitchRow-sc-1y8l4f3-0 cRtkWa">
                                <div className="switch__SwitchContainer-sc-3qgnxx-0 kAQKJD">
                                  <label className="switch__Label-sc-3qgnxx-2 jQlVTm">
                                    Auto
                                    <input
                                      type="radio"
                                      name="switch"
                                      className="switch__RadioButton-sc-3qgnxx-1 cYHPsj mousetrap"
                                      defaultValue="on"
                                      defaultChecked
                                    />
                                  </label>
                                  <label className="switch__Label-sc-3qgnxx-2 iaeDWK">
                                    Manual
                                    <input
                                      type="radio"
                                      name="switch"
                                      className="switch__RadioButton-sc-3qgnxx-1 cYHPsj mousetrap"
                                      defaultValue="off"
                                    />
                                  </label>
                                  <span className="switch__SwitchSpan-sc-3qgnxx-3 kOzlUx" />
                                </div>
                              </div>
                              <div className="row__Row-sc-1nodxmc-0 jyNboj">
                                <span className="label__Label-sc-1iotp2-0 fPzeIX">
                                  Default Page Duration
                                </span>
                                <input
                                  step="0.1"
                                  min={1}
                                  max={20}
                                  aria-label="Default Page Duration"
                                  type="range"
                                  className="rangeInput__Input-sc-1biz0vu-0 kHQPIq"
                                  defaultValue={7}
                                />
                              </div>
                              <div className="row__Row-sc-1nodxmc-0 jyNboj">
                                <div className="numeric__Container-sc-9ju0cw-1 jJpBAL pageAdvancement__BoxedNumeric-sc-1y8l4f3-1 wwjeg">
                                  <input
                                    type="text"
                                    aria-label="Default page duration in seconds"
                                    className="input__Input-sc-1db51zv-0 numeric__StyledInput-sc-9ju0cw-0 fpJyiX CLugR"
                                    defaultValue="7s"
                                  />
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      </section>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div id="modal__export" className="c-modal c-modal--center">
        <div
          className="c-modal__window c-modal__window--withHeader c-modal__window--managed mdl-card mdl-shadow--2dp"
          title="Export"
        >
          <div className="c-modal__content" />
        </div>
      </div>
      <div id="modal__login" className="c-modal">
        <div className="c-modal__window c-modal__window--withHeader c-modal__window--managed mdl-card mdl-shadow--2dp">
          <div className="c-modal__content">
            <div id="firebaseui-auth-container" lang="en">
              <div className="firebaseui-container firebaseui-page-provider-sign-in firebaseui-id-page-provider-sign-in firebaseui-use-spinner">
                <div className="firebaseui-card-content">
                  <form onsubmit="return false;">
                    <ul className="firebaseui-idp-list">
                      <li className="firebaseui-list-item">
                        <button
                          className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-password firebaseui-id-idp-button"
                          data-provider-id="password"
                          style={{ backgroundColor: "#db4437" }}
                          data-upgraded=",MaterialButton"
                        >
                          <span className="firebaseui-idp-icon-wrapper">
                            <img
                              className="firebaseui-idp-icon"
                              alt=""
                              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/mail.svg"
                            />
                          </span>
                          <span className="firebaseui-idp-text firebaseui-idp-text-long">
                            Sign in with email
                          </span>
                          <span className="firebaseui-idp-text firebaseui-idp-text-short">
                            Email
                          </span>
                        </button>
                      </li>
                      <li className="firebaseui-list-item">
                        <button
                          className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-google firebaseui-id-idp-button"
                          data-provider-id="google.com"
                          style={{ backgroundColor: "#ffffff" }}
                          data-upgraded=",MaterialButton"
                        >
                          <span className="firebaseui-idp-icon-wrapper">
                            <img
                              className="firebaseui-idp-icon"
                              alt=""
                              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            />
                          </span>
                          <span className="firebaseui-idp-text firebaseui-idp-text-long">
                            Sign in with Google
                          </span>
                          <span className="firebaseui-idp-text firebaseui-idp-text-short">
                            Google
                          </span>
                        </button>
                      </li>
                    </ul>
                  </form>
                </div>
                <div className="firebaseui-card-footer firebaseui-provider-sign-in-footer">
                  <p className="firebaseui-tos firebaseui-tospp-full-message">
                    By continuing, you are indicating that you accept our{" "}
                    <a
                      href="javascript:void(0)"
                      className="firebaseui-link firebaseui-tos-link"
                      target="_blank"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="javascript:void(0)"
                      className="firebaseui-link firebaseui-pp-link"
                      target="_blank"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="modal__upload" className="c-modal">
        <div
          className="c-modal__window c-modal__window--withHeader c-modal__window--managed mdl-card mdl-shadow--2dp"
          title="Upload files"
        >
          <div className="c-modal__content" />
        </div>
      </div>
      <div id="modal__account" className="c-modal">
        <div
          className="c-modal__window c-modal__window--extralarge c-modal__window--withHeader c-modal__window--managed mdl-card mdl-shadow--2dp"
          title="My Stories"
        >
          <div className="c-modal__content" />
        </div>
      </div>
      <div id="modal__templates" className="c-modal">
        <div
          className="c-modal__window c-modal__window--extralarge c-modal__window--withHeader c-modal__window--managed mdl-card mdl-shadow--2dp"
          title="Select a Template"
        >
          <div className="c-modal__content" />
        </div>
      </div>
      <div id="modal__preview" className="c-modal">
        <div
          className="c-modal__window c-modal__window--withHeader c-modal__window--full mdl-card mdl-shadow--2dp"
          title="Preview"
        >
          <div className="c-modal__content" />
        </div>
      </div>
      <link
        rel="stylesheet"
        id="edit-story-css"
        href="./assets/editor/css/edit-story.css"
      />
      <div className="ReactModalPortal" />
      <div className="ReactModalPortal" />
      <div className="ReactModalPortal" />
      <div className="ReactModalPortal" />
      <div
        id="web-stories-aria-live-region-assertive"
        className="web-stories-aria-live-region"
        style={{
          position: "absolute",
          margin: "-1px",
          padding: 0,
          height: "1px",
          width: "1px",
          overflow: "hidden",
          clip: "rect(1px, 1px, 1px, 1px)",
          WebkitClipPath: "inset(50%)",
          clipPath: "inset(50%)",
          border: 0,
          wordWrap: "normal !important",
        }}
        aria-live="assertive"
        aria-relevant="additions text"
        aria-atomic="true"
      />
      <div className="ReactModalPortal" />
    </div>
  );
};

export default myStory;
