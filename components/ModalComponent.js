import { View, Text, Modal, Pressable } from 'react-native'
import React from 'react'

const ModalComponent = ({ school, modalVisible, onClose }) => {
  return (
    <View >
            <Modal
                animationType="slide"
                // transparent={true}
                visible={modalVisible}
                //presentationStyle={"overFullScreen"} // iOS prop only
                onRequestClose={() => {
                    onClose();
                }}
            >
                <View >
                    <View >
                        <Text >Journal entry:</Text>
                        <View>
                            {/* <Text>
                                {school.school_name}
                                {"\n"}
                            </Text> */}
                        </View>
                        <Pressable
                            //style={[styles.modalButton, styles.buttonClose]}
                            onPress={() => onClose()}
                        >
                            <Text>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
  )
}

export default ModalComponent