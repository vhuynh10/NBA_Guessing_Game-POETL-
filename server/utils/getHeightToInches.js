function getHeightInInches(height) {
    const [ft, inch] = height.split('-').map(Number);
  return ft * 12 + inch;
}

export default getHeightInInches