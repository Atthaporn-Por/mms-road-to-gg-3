export default {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  button: {
    flex: 1,
    height: 65 * 1.00,
    marginVertical: 5,
    borderRadius: 35
  },
  buttonImage: {
    width: 211 * 1.00,
    height: 65 * 1.00,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  disabledButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 35
  }
}
