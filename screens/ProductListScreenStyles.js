import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 2 - 24; // Two items per row with spacing

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  headerContainer: {
    backgroundColor: '#121212',
    paddingTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 16,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  appSubtitle: {
    fontSize: 14,
    color: '#aaa',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#121212',
    zIndex: 2,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  searchbar: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#222',
    elevation: 0,
    height: 48,
  },
  searchInput: {
    color: '#fff',
  },
  viewToggleButton: {
    width: 48,
    height: 48,
    borderRadius: 10,
    marginLeft: 8,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  categoryContainer: {
    backgroundColor: '#121212',
    paddingVertical: 8,
  },
  categoryList: {
    paddingHorizontal: 8,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 6,
    backgroundColor: '#222',
  },
  activeCategoryTab: {
    backgroundColor: '#FF6B6B',
  },
  categoryText: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: '500',
  },
  activeCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  gridContainer: {
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 80,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
  },
  gridCard: {
    width: ITEM_WIDTH,
    margin: 8,
    borderRadius: 16,
    backgroundColor: '#1E1E1E',
    overflow: 'hidden',
    elevation: 4,
  },
  // Improved image container for better fitting
  imageContainer: {
    width: '100%',
    height: 140,
    backgroundColor: '#2A2A2A',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridImage: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
  },
  gridCardContent: {
    paddingTop: 12,
    paddingBottom: 16,
  },
  gridProductTitle: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    color: '#00D166', // Green color for price
    fontWeight: '600',
  },
  priceRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#ccc',
    marginLeft: 4,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 6,
    borderRadius: 15,
    zIndex: 2,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    zIndex: 2,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  listCard: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: '#1E1E1E',
    overflow: 'hidden',
    elevation: 4,
  },
  listCardInner: {
    flexDirection: 'row',
    padding: 12,
  },
  // Improved list image container
  listImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#2A2A2A',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listImage: {
    width: '100%',
    height: '100%',
  },
  listCardContent: {
    flex: 1,
    paddingLeft: 12,
    paddingTop: 0,
    justifyContent: 'center',
  },
  listProductTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  listDiscountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    zIndex: 2,
  },
  listFavoriteButton: {
    padding: 6,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignSelf: 'flex-start',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF6B6B',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: '#777',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
  },
});

export default styles;