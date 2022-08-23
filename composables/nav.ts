export function useNavState() {
  return useState('nav', () => ({ isOpen: false }))
}
