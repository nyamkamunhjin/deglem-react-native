import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const getHeaderTitle = (route) => {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Diary';

  switch (routeName) {
    case 'diary-tabs':
      return 'Diary';
    case 'mygoal-tab':
      return 'My Goal';
    case 'nutrition-tab':
      return 'Nutrition';
  }
}

export { getHeaderTitle }