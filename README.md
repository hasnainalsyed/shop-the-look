# shop-the-look
This JavaScript code appears to be setting up a series of Swiper instances to create sliders and carousels on a webpage. Here's a breakdown of what the code does:

1. It initializes several variables to store Swiper instances and DOM elements.
2. It selects DOM elements using `querySelector` and `querySelectorAll`.
3. It sets up the main Swiper instance using `new Swiper()` with options like slidesPerView, spaceBetween, and navigation buttons.
4. It defines functions to initialize inner Swipers, handle slide changes, initialize popup Swipers, handle popup slide changes, and manage popup buttons.
5. It sets up event listeners for DOM elements such as dot buttons and close buttons.
6. It defines functions to disable and enable the main Swiper, scale the main container when a popup is opened, and reset the main container's transformation when a popup is closed.
7. It defines a function to handle screen size changes and adjust the layout and behavior of sliders accordingly.
8. It attaches an event listener to the `DOMContentLoaded` event to initialize the setup when the DOM content is fully loaded.
9. It attaches an event listener to the `resize` event to handle changes in screen size dynamically.

Overall, the code sets up a complex carousel/slider system using the Swiper library, manages the interaction between main sliders and popup sliders, and adjusts the layout and behavior based on screen size changes.
