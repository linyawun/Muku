export const pagination = {
  clickable: true,
  renderBullet: function (_: any, className: string) {
    return `
      <div class="${className}">
        <span class=""></span>
      </div>
    `;
  },
};
