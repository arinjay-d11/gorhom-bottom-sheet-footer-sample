import 'react-native-gesture-handler';
import {useCallback, useMemo, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableNativeFeedback,
} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  // ref to control BottomSheet
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // Function to open the bottom sheet
  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(1); // Snap to '50%' point
  }, []);

  // Function to close the bottom sheet
  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close(); // Close the bottom sheet
  }, []);

  const renderFooter = useCallback(propsFooter => {
    return (
      <BottomSheetFooter {...propsFooter}>
        <View style={{flexDirection: 'row', flex: 1, backgroundColor: 'red'}}>
          <Text style={{flex: 1, height: 50, color: 'white', fontSize: 17}}>
            This is the footer component of bottom sheet
          </Text>
        </View>
      </BottomSheetFooter>
    );
  }, []);

  // renders
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <Button title="Open Bottom Sheet" onPress={openBottomSheet} />
        <Button title="Close Bottom Sheet" onPress={closeBottomSheet} />
        <BottomSheet
          index={-1} // Initial index set to -1 (hidden)
          enableOverDrag={false}
          enablePanDownToClose={true}
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          backdropComponent={props => (
            <BottomSheetBackdrop
              {...props}
              opacity={0.1}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
            />
          )}
          footerComponent={renderFooter}
          snapPoints={[200, '50%']}>
          <BottomSheetView style={styles.contentContainer}>
            <Text
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontSize: 20,
              }}>
              This is the content of bottom sheet having Green Background
            </Text>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    backgroundColor: 'green',
    flex: 1,
    alignItems: 'center',
  },
});

export default App;
