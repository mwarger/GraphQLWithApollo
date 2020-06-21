module.exports = {
  makeSpeakerFeatured: async (parent, { id }, { dataSources }, info) => {
    const speaker = await dataSources.speakerAPI.makeSpeakerFeatured(id);
    return speaker;
  },
  signUp: async (parent, args, context, info) => {
    const speaker = await dataSources.userService.signUp(id);
    return speaker;
  },
  signIn: async (parent, args, context, info) => {
    const speaker = await dataSources.userService.signIn(id);
    return speaker;
  },
};
