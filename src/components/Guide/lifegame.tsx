import { useState, useEffect } from "react";

type Matrix = number[][];

function sizePX(canvasSize = 300) {
    if (canvasSize !== 0)
        return {
            height: canvasSize + "px",
            width: canvasSize + "px",
        };
}

export default () => {
    const [canvasSize, setCanvasSize] = useState<number>(250);

    useEffect(() => {
        const canvas = document.getElementById("lifegame") as HTMLCanvasElement;
        const c = canvas.getContext("2d");
        if (!canvas || !c) return;
        const canvasSize = Math.round(canvas.offsetWidth / 10) * 10; // 减去 padding 占用的空间
        const matrixSize = canvasSize / 10;
        const cellSize = 10;
        //  初始化画布
        c.fillStyle = "#fff"; // 灰色背景色
        c.fillRect(0, 0, canvasSize, canvasSize);

        // 初始化矩阵
        const cellMatrix = initCellMatrix(matrixSize);

        // 绑定鼠标事件
        canvas.addEventListener("mousemove", mousePassCanvas);

        setCanvasSize(canvasSize);

        // 主循环
        function Main(cellMatrix: Matrix) {
            const tempM = JSON.parse(JSON.stringify(cellMatrix)) as Matrix;
            liveStatusUpdate(tempM);
            mapMatrix(cellMatrix);
        }

        // 矩阵状态映射至canvas网格
        // 初始化细胞矩阵
        function initCellMatrix(size: number) {
            const array = new Array<number[]>(size);
            for (let i = 0; i < size; i++) {
                array[i] = new Array(size);
                for (let j = 0; j < size; j++) array[i][j] = Math.round(Math.random()); // array[i][j] = 0 // 默认细胞死亡
            }
            return array;
        }
        // 细胞周围生存情况
        function surroundCell(_x: number, _y: number, cellmatrix: Matrix) {
            // 映射至细胞矩阵数组坐标
            let liveNumber = 0;
            for (let i = _x - 1; i <= _x + 1; i++)
                for (let j = _y - 1; j <= _y + 1; j++) if (i >= 0 && i < cellmatrix.length && j >= 0 && j < cellmatrix.length && !(i === _x && j === _y)) liveNumber += cellmatrix[i][j] === 1 ? 1 : 0;
            return liveNumber;
        }

        function liveRule(x: number, y: number, matrix: Matrix) {
            // 规则1.如果一个细胞周围有三个细胞为生，则该细胞为生
            // 规则2.如果一个细胞周围有2个细胞为生，
            // 规则3.在其它情况下，该细胞为死（即该细胞若原先为生，则转为死，若原先为死，则保持不变）
            const surroundLiveNumber = surroundCell(x, y, matrix);
            switch (surroundLiveNumber) {
                case 3:
                    cellMatrix[x][y] = 1;
                    return 1;
                case 2:
                    return -1;
                default:
                    cellMatrix[x][y] = 0;
                    return 0;
            }
        }
        // _x, _y 为细胞矩阵中的坐标，映射至canvas
        function liveCell(_x: number, _y: number) {
            if (!c) return;
            c.fillStyle = "#111";
            c.fillRect(_x * cellSize, _y * cellSize, cellSize * window.devicePixelRatio, cellSize * window.devicePixelRatio);
        }
        // 杀死细胞
        function killCell(_x: number, _y: number) {
            if (!c) return;
            //        c.fillStyle='#eeeeee'; // 采用背景色填充
            c.fillStyle = "#fff";
            c.fillRect(_x * cellSize, _y * cellSize, cellSize * window.devicePixelRatio, cellSize * window.devicePixelRatio);
        }
        function mapMatrix(matrix: Matrix) {
            const length = matrix.length;
            for (let x = 0; x < length; x++) for (let y = 0; y < length; y++) matrix[x][y] === 1 ? liveCell(x, y) : killCell(x, y);
        }
        function mousePassCanvas(event: MouseEvent) {
            const X = event.offsetX;
            const Y = event.offsetY;
            const offsetMatrixX = Math.floor(X / cellSize);
            const offsetMatrixY = Math.floor(Y / cellSize);
            if (offsetMatrixX <= 0 || offsetMatrixY <= 0) return;
            if (offsetMatrixX < matrixSize && offsetMatrixY < matrixSize) cellMatrix[offsetMatrixX][offsetMatrixY] = 1;
            mapMatrix(cellMatrix);
        }

        // 细胞状态更新
        function liveStatusUpdate(matrix: Matrix) {
            const length = matrix.length;
            for (let i = 0; i < length; i++) for (let j = 0; j < length; j++) liveRule(i, j, matrix);
        }

        // 开始主循环
        let start: number | null = null;
        const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            if (progress > 60) {
                start = timestamp - (progress % 60);
                Main(cellMatrix);
            }
            requestAnimationFrame(step);
        };
        requestAnimationFrame(step);

        return () => canvas.removeEventListener("mousemove", mousePassCanvas);
    }, []);
    return (
        <div className="lifegame-box" style={sizePX(canvasSize)}>
            <canvas id="lifegame" width={canvasSize} height={canvasSize} />
        </div>
    );
};
