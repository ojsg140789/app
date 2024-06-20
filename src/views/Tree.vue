<template>
    <v-container>
        <v-row no-gutters>
            <v-col cols="12">
                <v-toolbar-title class="custom-title">Árbol</v-toolbar-title>
                <v-sheet class="ma-2 pa-2" v-if="treeData.length == 0">
                    <v-file-input v-model="file" label="Seleccionar archivo JSON" accept=".json"
                        @change="handleFileUpload">
                    </v-file-input>
                </v-sheet>
                <v-sheet class="ma-2 pa-2" v-if="treeData.length > 0">
                    <ul>
                        <v-btn variant="text" @click="addDirectory()"> Agregar directorio </v-btn>
                        <li v-for="(item, index) in treeData" :key="index">
                            {{ item.name }} <v-btn variant="text" @click="addElemnt(index)"> Agregar </v-btn> <v-btn
                                variant="text" @click="openDialog(item, index, -1)"> Editar </v-btn> <v-btn
                                variant="text" @click="deleteDir(index)"> Eliminar </v-btn>
                            <v-container>
                                <v-row no-gutters>
                                    <v-col cols="12">
                                        <v-sheet class="ma-2 pa-2">
                                            <ul v-if="item.child">
                                                <li v-for="(i, idx) in item.child" :key="idx">
                                                    {{ i.name }}
                                                    <v-btn variant="text"
                                                        @click="openDialog(i, index, idx)">Editar</v-btn>
                                                    <v-btn variant="text"
                                                        @click="deleteElement(index, idx)">Eliminar</v-btn>
                                                </li>
                                            </ul>
                                        </v-sheet>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </li>
                    </ul>
                </v-sheet>
            </v-col>
        </v-row>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Editar Nombre</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="editedName" label="Nombre"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="saveName">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>

export default {
    components: {
    },
    data() {
        return {
            treeData: [],
            dialog: false,
            editedName: '',
            editedIndex: -1,
            editedIndexChild: -1
        };
    },
    created() {
        this.loadTreeData();
    },
    methods: {
        async loadTreeData() {
        },
        addNode(node) {
            node.children.push({ name: 'New Node', children: [] });
        },
        editNode(node, newName) {
            node.name = newName;
        },
        deleteNode(parent, index) {
            parent.children.splice(index, 1);
        },
        addDirectory() {
            const _dir = {
                name: 'Nuevo directorio',
                child: []
            }
            this.treeData.push(_dir);
        },
        addElemnt(index) {
            const _ele = {
                name: 'Nuevo elemento'
            }
            this.treeData[index].child.push(_ele);
        },
        deleteDir(index) {
            this.treeData.splice(index, 1);
        },
        deleteElement(index, idx) {
            this.treeData[index].child.splice(idx, 1);
        },
        openDialog(item, index, idx) {
            this.editedName = item.name;
            this.editedIndex = index;
            this.editedIndexChild = idx;
            this.dialog = true;
        },
        closeDialog() {
            this.dialog = false;
            this.editedName = '';
            this.editedIndex = -1;
            this.editedIndexChild = -1;
        },
        saveName() {
            if (this.editedIndex !== -1 && this.editedIndexChild == -1) {
                this.treeData[this.editedIndex].name = this.editedName;
                this.closeDialog();
            } else {
                this.treeData[this.editedIndex].child[this.editedIndexChild].name = this.editedName;
                this.closeDialog();
            }
        },
        handleFileUpload() {
            const fileReader = new FileReader();
            fileReader.readAsText(this.file, 'UTF-8');
            fileReader.onload = () => {
                try {
                    this.treeData = JSON.parse(fileReader.result);
                } catch (error) {
                    console.error('Error al leer el archivo JSON:', error);
                    this.treeData = [];
                }
            };
            fileReader.onerror = () => {
                console.error('Error al leer el archivo.');
            };
        }
    }
};
</script>