/**
 * Binary masks a text element and reveals the actual value 1 by 1.
 * @param element The HTML element to apply the effect to
 * @param targetText The final string you want to show
 * @param matrixDuration How long (in ms) to flash binary before starting the reveal
 */
export function binaryReveal(
  element: HTMLElement,
  targetText: string,
  matrixDuration: number = 1500
) {
  let revealedCount = 0;
  const startTime = Date.now();

  const intervalId = setInterval(() => {
    const elapsed = Date.now() - startTime;

    // Phase 1: Pure flashing binary mask across the exact layout
    if (elapsed < matrixDuration) {
      element.innerText = targetText
        .split("")
        .map((char) => {
          if (char === " ") return " ";
          return Math.random() > 0.5 ? "1" : "0";
        })
        .join("");
    } 
    // Phase 2: Lock in actual values 1 by 1 from left to right
    else {
      element.innerText = targetText
        .split("")
        .map((char, index) => {
          if (index < revealedCount) {
            return char; // Lock in the real character
          }
          if (char === " ") return " "; // Keep spacing pristine
          return Math.random() > 0.5 ? "1" : "0"; // Flash binary for unrevealed slots
        })
        .join("");

      revealedCount++;

      if (revealedCount > targetText.length) {
        clearInterval(intervalId);
        element.innerText = targetText; // Clean final match
      }
    }
  }, 100); // ms interval
}
