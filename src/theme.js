export default class Styles{
  //SCREEN SIZES
  static xs = '@media screen and (max-width: 480px)'
  static sm = '@media screen and (min-width: 768px)'
  static md = '@media screen and (min-width: 992px)'
  static lg = '@media screen and (min-width: 1200px)'
  //GLOBAL COLORS
  static red = '#e1523d'
  static white = '#fff'
  static lightwhite = '#F7F7F7'
  static brown = '#5b5b5b'
  static lightbrown = '#e8e8e8'
  static lightbrown2 = '#B3B3B3'
  static black = '#303030'
  static lightblack = '#818181'
  static darkblue = '#3f2a56'
  static darkpurple = '#300f30'
  static rednoti = '#DB6464'
  static greennoti = '#63C079'
  static lightgreen = '#B1D299'
  static darkblue2 = '#311851'
  static yellow = '#EBB436'
  static subsesionBorder = '#E9E9E9'
  //STYLES HELPS
  //truncar un texto con tres puntos al final
  static truncate(width) {
    return `
      width: ${width};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `;
  }
}