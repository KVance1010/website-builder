export const buildAside = (asideSettings) => {
  let asideStyle;
  let pop;

  if (asideSettings.asidePop === 'Pop') {
    pop = "margin: 3px; box-shadow: 2px 0px 20px;;";
  } else {
    pop = '';
  }

  if (asideSettings.asideGrad === 'Yes') {
    // TODO: color:${asideSettings}
    asideStyle = `background-image: 'linear-gradient(to bottom right,${asideSettings. asideBackCol}, ${asideSettings. asideBackColGrad})'; ; font-family:${asideSettings.asideTextFont}; ${pop} height:100vh; width: 20%;`;
  } else {
    asideStyle = `background-color:${asideSettings.asideBackCol}; font-family:${asideSettings.asideTextFont}; ${pop} height:100vh; width: 20%;`;
  }

  // TODO: when added
  // font color color:{};
  // font-family:${asideSettings.asideTitleFont}
  let asideRender = ` 
      <aside style="${asideStyle}">
      <h2 font-family:sarif>${asideSettings.asideTitle}</h2>
      <p>${asideSettings.asideContentText}</p>
      </aside>`;
  return asideRender;
}

//             asideGrad: asideGrad,
//             asideBackCol: colorAside,
//             asidebackColGrad: colorAsideGrad,
//             asideTitle: asideTitle,
//             asideContentText: asideContentText,
//             asideDir: asideDir,
//             asidePop: asidePop,
//             asideTextFont
//             asideTitleFont