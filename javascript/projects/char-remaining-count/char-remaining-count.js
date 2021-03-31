function configCharCount(config) {
 
    const addCSS = function() {
      const head =  document.getElementsByTagName('head');

      const link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('href', 'char-remaining-count.css');

      if(head) {
          head[0].appendChild(link);
      } else {
          document.appendChild(link);
      }
    }

    const remainingCharacters = function(element) {
        return element.getAttribute('maxlength') - element.value.length;
    }

    const createCharRemainingElement = function(element) {
        const charEl = document.createElement("div");
        charEl.setAttribute('class', 'char-remaining-count');
        if(config && config.color) {
            charEl.setAttribute('style', `color:${config.color}`);
        }
        charEl.textContent = remainingCharacters(element);
        return charEl;
    }

    const addListenerToInput = function(element) {
        element.addEventListener('input', function() {
            if(this.getAttribute('maxlength')){
                const nextElement = this.nextElementSibling;
                nextElement.textContent = remainingCharacters(this);
            }
        });
    }

    const initialize = function() {
        addCSS();
        document.querySelectorAll('input[maxlength], textarea[maxlength]').forEach(element => {
            const charEl = createCharRemainingElement(element);
            element.parentNode.insertBefore(charEl, element.nextElementSibling);
            addListenerToInput(element);
        });

    }

    window.addEventListener('DOMContentLoaded', (event) => {
      initialize();
    });
}