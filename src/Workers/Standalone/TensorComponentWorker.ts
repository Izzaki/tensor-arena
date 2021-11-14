import {ThreadWorkerInternal} from "../ThreadWebWorker";
import {TensorComponent} from "../../Components/TensorComponent";

const threadWorker = new ThreadWorkerInternal(new TensorComponent());
threadWorker.start();
