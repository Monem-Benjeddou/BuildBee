export const getGroupColor = (group) => {
  const colors = {
    'Groupe A': '#0083cb',
    'Groupe B': '#ed174c',
    'Groupe C': '#8dc63f',
    'default': '#757575'
  };
  return colors[group] || colors.default;
};
