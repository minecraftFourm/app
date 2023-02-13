import { PrismaClient } from "@prisma/client";
import { ADMIN_USER_ID, ANNOUNCEMENT_CATEGORY_ID } from "../../config";
const prisma = new PrismaClient();


export const announcement1_ID = "64b2c0f3-e725-4f7d-aeba-c44fe955ec1e"
export const announcement2_ID = "b82139b5-9aff-40f2-b370-1978f385e9f2"

const posts = async () => {
	const announcement1 = await prisma.post.upsert({
		where: { id: announcement1_ID },
		update: {},
		create: {
			id: announcement1_ID,
			content: `<h2 style="text-align: center;"><img style="font-size: 16px;" src="https://i0.wp.com/www.thewebdesigncompany.eu/wp-content/uploads/2020/04/WHAT-IS-lorem-ipsum.jpg?fit=960%2C720&amp;ssl=1" alt="" width="1080" height="810"></h2>
            <h2 style="text-align: center;">What is Lorem Ipsum?</h2>
            <p style="text-align: center;"><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
			title: "Example announcement 1",
			ownerId: ADMIN_USER_ID,
			categoryId: ANNOUNCEMENT_CATEGORY_ID,
		},
	});

	const announcement2 = await prisma.post.upsert({
		where: { id: announcement2_ID },
		update: {},
		create: {
			id: announcement2_ID,
			content: `<p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0tFxc2uV8cDYw3LUka85L_eYsLKDDWLvdUA&amp;usqp=CAU" alt="" width="599" height="312"></p>
            <p style="text-align: center;"><span style="font-size: 24pt;"><strong>Lorem Ipsum</strong></span></p>
            <p style="text-align: center;">&nbsp;</p>
            <p style="text-align: center;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac diam odio. Nullam bibendum, magna et ornare interdum, eros enim faucibus est, mollis efficitur magna nulla maximus erat. Etiam maximus hendrerit porta. Sed quis neque sit amet velit consectetur venenatis at at mi. Etiam vel lorem auctor lorem lacinia tincidunt et vitae ipsum. Morbi dictum vestibulum odio et pellentesque. Integer sagittis leo sit amet aliquet tincidunt. Vivamus sollicitudin euismod convallis. Ut id pharetra purus, volutpat cursus erat. Maecenas eros nisl, suscipit in cursus sagittis, commodo eget diam. Integer eleifend sapien quis nisl vulputate sodales. Integer rhoncus nibh vitae suscipit commodo.</p>
            <p style="text-align: center;">Phasellus nec vehicula libero. Maecenas viverra fermentum magna eget sollicitudin. Duis leo nisl, eleifend quis magna eu, scelerisque auctor ex. Aliquam volutpat mauris sit amet gravida varius. Quisque tincidunt volutpat lectus, sit amet ornare felis eleifend sit amet. Duis ullamcorper cursus dui et vehicula. Curabitur interdum blandit quam nec bibendum. Fusce quam arcu, tincidunt rutrum magna rutrum, gravida gravida libero. Maecenas cursus sed velit sollicitudin facilisis. Fusce volutpat condimentum nunc, nec faucibus augue placerat eget.</p>
            <p style="text-align: center;">Suspendisse non sapien et nisi venenatis vehicula. Aliquam quis mi arcu. Pellentesque vel tincidunt magna. In varius massa quis quam venenatis gravida. Cras vitae odio eros. Phasellus hendrerit interdum justo eu eleifend. Vestibulum in aliquam magna, bibendum venenatis enim. Praesent volutpat ultrices dignissim. Donec aliquam mi molestie, egestas metus ac, porta justo. Cras</p>`,
			title: "Example announcement 2",
			ownerId: ADMIN_USER_ID,
			categoryId: ANNOUNCEMENT_CATEGORY_ID,
		},
	});
};

export default posts;
