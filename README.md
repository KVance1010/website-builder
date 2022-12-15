# website-builder

## Description

## Usage

---

### Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Screenshots](#screenshots)
- [CodeSnippets](#codeSnippets)
- [License](#license)
- [Contributors](#contributors)
- [Tests](#tests)
- [Important-Information-Questions](#important-information-questions)

---

## Technologies

- **React**
- **CSS**
- **Cloudinary**
- **Dotenv**
- **Node**
- **MongoDB**
- **JavaScript**
- **File-Saver**
- **JS-Zip**
- **MUI**
- **Bootstrap**
- **JWT**
- **React-Router**
- **React-Multi-Carousel**
- **Debouncy**
- **DND.js**
- **GitHub**

---

## Screenshots

#### Home Page

![Landing Page](./src/assets/home.jpg)

#### Sign-up Page

![Sign-up Page](./src/assets/signup.jpg)

#### Build Page

![Build Page](./src/assets/buildpage.jpg)

---

## CodeSnippets

#### Setting the card components absolute position.

```JavaScript
const moveCard = useCallback(
        (id, left, top) => {
            const newCards = [...cards];
            newCards[id].left = left;
            newCards[id].top = top;

            setCards(newCards);
        },
        [cards, setCards],
    );
```

#### Checking setting loggedIn status

```javascript
<li className="">
				{Auth.loggedIn() ? (
					<a className="header_link">
						<p id="logout_button" className="nav_link" onClick={Auth.logout}>
							Logout
						</p>
					</a>
				) : (
					<Link to="/login" className="header_link">
						<p className="nav_link">Login</p>
					</Link>
				)}
			</li>
```

---

## Tests

N/A

---

## **Important-Information-Questions**

---

## License

The license used on this project was MIT license

[license link](https://opensource.org/licenses/MIT)

## Contributors

Adam Ferro, Dominic Conradson, Mason Davis, and Kyle Vance

## Questions

Reach out to us on LinkedIn.

[Live Link](https://aspiration-architects.herokuapp.com)

[LinkedIn-Adam](https://www.linkedin.com/in/adam-ferro/)
[LinkedIn-Dominic](https://www.linkedin.com/in/dominic-conradson-76638b172/)
[LinkedIn-Mason](https://www.linkedin.com/in/davis-mason-t/)
[LinkedIn-Kyle](https://www.linkedin.com/in/kyle-s-vance/)
