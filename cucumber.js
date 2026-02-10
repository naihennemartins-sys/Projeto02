export default {
  default: {
    paths: ['features/**/*.feature'],
    require: [
      'features/steps/**/*.js'
    ],
    timeout: 20000,
    publishQuiet: true
  }
};
