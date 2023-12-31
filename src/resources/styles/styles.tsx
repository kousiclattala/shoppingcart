import colors from '../colors/colors';

export default {
  androidShadow: {
    elevation: 1,
    shadowColor: colors.black60,
  },
  iosShadow: {
    shadowOffset: {
      width: 0,
      height: 0.2,
    },
    shadowRadius: 0.2,
    shadowOpacity: 0.1,
    shadowColor: colors.black60,
  },
  androidBottomShadow: {
    elevation: 20,
    shadowColor: colors.black100,
  },
  iosBottomShadow: {
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    shadowColor: colors.black60,
  },
};
