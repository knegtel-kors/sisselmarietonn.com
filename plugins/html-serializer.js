import Vue from 'vue';
import PrismicVue from 'prismic-vue';
import prismicDOM from 'prismic-dom';

const Elements = prismicDOM.RichText.Elements;

const htmlSerializer = (type, element, content, children) => {
  // If image
  if (type === Elements.image) {
    let result = `
      <img src="${element.url}" alt="${element.alt || ''}" />
      <p class="image-caption">
        ${element.copyright || ''}
      </p>
    `;

    return result;
  }

  // Return null to stick with the default behavior for everything else
  return null;
};

Vue.use(PrismicVue, {
  endpoint: 'https://sisselmarietonn.cdn.prismic.io/api/v2',
  htmlSerializer: htmlSerializer
});
