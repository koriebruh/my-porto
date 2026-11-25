<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import Badge from '$lib/components/ui/badge.svelte';
	import ImagePlaceholder from '$lib/components/image-placeholder.svelte';
	import LogoSlot from '$lib/components/logo-slot.svelte';
	import TechIcon, { hasTechIcon } from '$lib/components/tech-icon.svelte';
	import Doodle from '$lib/components/doodle.svelte';
	import ProjectModal from '$lib/components/project-modal.svelte';

	import mePhoto from '$lib/assets/about/me-web.jpg';
	import devOnCloud from '$lib/assets/illustrations/dev-on-cloud.webp';
	import devAtDesk from '$lib/assets/illustrations/dev-at-desk.webp';
	import devGraduation from '$lib/assets/illustrations/dev-graduation.webp';
	import devBuilding from '$lib/assets/illustrations/dev-building.webp';
	import devToolbox from '$lib/assets/illustrations/dev-toolbox.webp';
	import devPaperPlane from '$lib/assets/illustrations/dev-paper-plane.webp';
	import devChef from '$lib/assets/illustrations/dev-chef.webp';
	import devReading from '$lib/assets/illustrations/dev-reading.webp';
	import devSleeping from '$lib/assets/illustrations/dev-sleeping.webp';
	import monarchLogo from '$lib/assets/experice/monarch/Monarch-Inti-Teknologi-250X60-1.png';
	import mit1 from '$lib/assets/experice/monarch/mit1-web.jpg';
	import mit1T from '$lib/assets/experice/monarch/mit1-thumb.webp';
	import mit2 from '$lib/assets/experice/monarch/mit2-web.jpg';
	import mit2T from '$lib/assets/experice/monarch/mit2-thumb.webp';
	import mit3 from '$lib/assets/experice/monarch/mit3-web.jpg';
	import mit3T from '$lib/assets/experice/monarch/mit3-thumb.webp';
	import beyondtechLogo from '$lib/assets/experice/beyondtech/beyondtech.png';
	import firstudioLogo from '$lib/assets/experice/firstudio/firsudio.png';
	import fs1 from '$lib/assets/experice/firstudio/fs1-web.jpg';
	import fs1T from '$lib/assets/experice/firstudio/fs1-thumb.webp';
	import pwmjatengLogo from '$lib/assets/experice/pwmjateng/pwmjateng.png';
	import udinusLogo from '$lib/assets/experice/educations/udinus.png';
	import edu1 from '$lib/assets/experice/educations/edu1-web.jpg';
	import edu1T from '$lib/assets/experice/educations/edu1-thumb.webp';
	import edu2 from '$lib/assets/experice/educations/edu2-web.jpg';
	import edu2T from '$lib/assets/experice/educations/edu2-thumb.webp';
	import edu3 from '$lib/assets/experice/educations/edu3-web.jpg';
	import edu3T from '$lib/assets/experice/educations/edu3-thumb.webp';
	import isemanticLogo from '$lib/assets/experice/conference/isemantic.png';
	import con1 from '$lib/assets/experice/conference/con1-web.jpg';
	import con1T from '$lib/assets/experice/conference/con1-thumb.webp';
	import con2 from '$lib/assets/experice/conference/con2-web.jpg';
	import con2T from '$lib/assets/experice/conference/con2-thumb.webp';
	import con3 from '$lib/assets/experice/conference/con3-web.jpg';
	import con3T from '$lib/assets/experice/conference/con3-thumb.webp';
	import cvPdf from '$lib/assets/pdf/Muhammad_Jamaludin_Nur_CV_final.pdf?url';
	import paperPdf from '$lib/assets/pdf/isemantic-2025-churn-prediction.pdf?url';

	const experience = [
		{
			period: 'Jun 2026 to now',
			role: 'Backend Developer',
			org: 'PT Monarch Inti Teknologi',
			place: 'West Jakarta, Indonesia',
			points: [
				'Built a merchant aggregator engine: merchants integrate once, and several payment providers sit behind that one door.',
				'Wrote the routing logic that picks a healthy provider for every request, so payments keep flowing when one of them goes down.',
				'Made adding a new provider a small code change, so the business can sign new partners without a rewrite.'
			],
			logo: monarchLogo,
			assignment: {
				since: 'Since Sep 2026, on assignment at',
				org: 'PT Adisena Mitra Usaha (Beyondtech)',
				about:
					"A Monarch subsidiary. I'm still a Monarch employee, lending a hand to the Beyondtech team.",
				logo: beyondtechLogo,
				points: [
					'Connecting the platform to payment providers, both banks and non-bank PJPs, one integration at a time.',
					'Helping build remittance integrations, so money can cross borders without getting lost on the way.'
				]
			},
			images: [mit1, mit2, mit3],
			thumbs: [mit1T, mit2T, mit3T]
		},
		{
			period: 'Jan to Jul 2025',
			role: 'Backend Developer',
			org: 'PT Firstudio',
			place: 'Semarang (hybrid)',
			points: [
				'Built a citizen management system for 24,000+ residents: 43 REST endpoints, and one place where every city department manages its data.',
				'Locked it down with API keys and rate limits, then shipped it to a production VPS with Docker so every release goes out the same way.'
			],
			logo: firstudioLogo,
			logoOnDark: true,
			images: [fs1],
			thumbs: [fs1T]
		},
		{
			period: 'Feb to Mar 2025',
			role: 'Web Developer Intern',
			org: 'PWM Jateng',
			place: 'Semarang',
			points: [
				'Moved event sign-ups, donation tracking and public info pages for two divisions online, in two months flat.'
			],
			logo: pwmjatengLogo,
			logoOnDark: true,
			images: [],
			thumbs: []
		},
		{
			period: 'Dec 2023',
			role: 'Student Mentor, Basic Programming',
			org: 'Universitas Dian Nuswantoro',
			place: 'Semarang',
			points: [
				'Ran a 3-day workshop teaching programming basics to junior students. Many missing semicolons were found together.'
			],
			logo: udinusLogo,
			images: [],
			thumbs: []
		}
	];

	const projects = [
		{
			name: 'Enterprise Banking Microservices',
			href: 'https://github.com/koriebruh/banking-services',
			stack: [
				'Go Fiber',
				'Spring Boot',
				'Kafka',
				'gRPC',
				'PostgreSQL',
				'Redis',
				'Spring Cloud Gateway',
				'Eureka',
				'Docker'
			],
			quote:
				'A banking backend split into six services. If the notification service naps right after a transfer, the system keeps retrying until it wakes up, so no money event ever goes missing.',
			points: [
				'Six independent services for transfers, auth (TOTP 2FA + JWT), accounts, audit logs and real-time notifications. Each one scales on its own.',
				'Kafka carries events between services, so a slow consumer never blocks a transfer.'
			]
		},
		{
			name: 'Bank Indonesia SNAP SDK for Go',
			href: 'https://github.com/koriebruh/go-snap-bi',
			docsHref: 'https://snap-bi.jamalkya.lol',
			stack: ['Go', 'REST API'],
			quote:
				"A Go SDK for Bank Indonesia's SNAP standard: 79 typed endpoints, zero third-party dependencies, and request signing handled for you.",
			points: [
				'Covers all 7 ASPI SNAP categories, from registration and balance inquiry to transaction history and credit/debit transfers. Published as a versioned Go module.',
				'HMAC/RSA request signing, automatic B2B token refresh with single-flight caching, and signature checks for incoming payment callbacks.',
				'The HTTP status always wins over the SNAP response code, never the other way around.'
			]
		}
	];

	const plannedProjects = [
		{
			name: 'Saga orchestrator for multi-provider payments',
			stack: ['Go', 'Apache Kafka', 'PostgreSQL'],
			summary:
				'If step 3 of 5 fails, undo steps 1 and 2 instead of leaving a merchant half-charged.'
		},
		{
			name: 'Real-time fraud scoring',
			stack: ['Go', 'gRPC', 'Redis'],
			summary:
				'Score every transaction for risk while it is still in flight, so suspicious ones get flagged before settlement instead of after.'
		},
		{
			name: 'Double-entry ledger engine',
			stack: ['Go', 'PostgreSQL'],
			summary:
				'Every balance is rebuilt from events, so "how did this balance get here?" always has an answer.'
		}
	];

	const skills = [
		{ group: 'Languages', items: ['Go', 'Java', 'TypeScript', 'Python', 'Rust', 'SQL'] },
		{
			group: 'Frameworks & APIs',
			items: ['Spring Boot', 'Go Fiber', 'Gin', 'GORM', 'gRPC', 'REST API', 'WebSocket']
		},
		{
			group: 'Databases & Messaging',
			items: [
				'PostgreSQL',
				'MySQL',
				'ClickHouse',
				'Redis',
				'Valkey',
				'Elasticsearch',
				'Apache Kafka',
				'RabbitMQ'
			]
		},
		{
			group: 'Observability & Workflow',
			items: ['Prometheus', 'Grafana', 'Jaeger', 'OpenTelemetry', 'Temporal', 'k6']
		},
		{
			group: 'DevOps & Architecture',
			items: ['Docker', 'MinIO', 'VPS', 'Git', 'Linux', 'Microservices']
		}
	];
	// cards pop in once as they scroll into view
	function pop(node: HTMLElement) {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			node.classList.add('is-in');
			return;
		}
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					node.classList.add('is-in');
					io.disconnect();
				}
			},
			{ rootMargin: '0px 0px -12% 0px' }
		);
		io.observe(node);
		return { destroy: () => io.disconnect() };
	}

	// patterns I've used, drawn as little step chains (last step marked when it's the fallback)
	const patterns = [
		{
			name: 'Saga',
			steps: ['Order', 'Payment', 'Stock'],
			note: 'Stock runs out, so Payment and Order undo themselves in reverse. Nobody pays for a missing item.',
			color: 'bg-pink-soft'
		},
		{
			name: 'Transactional outbox',
			steps: ['Write DB', 'Outbox', 'Broker'],
			note: 'The data and its event are saved in one transaction, so the event still ships even if the broker was down.',
			color: 'bg-mint-soft'
		},
		{
			name: 'Dead letter queue',
			steps: ['Consume', 'Retry', 'DLQ'],
			note: 'A message that keeps failing gets parked for a human to inspect, instead of blocking everything behind it.',
			color: 'bg-sun-soft'
		}
	];
	let openProject = $state<(typeof projects)[number] | null>(null);

	const tabColors = ['bg-sun', 'bg-accent', 'bg-mint', 'bg-lilac'];
	const noteColors = ['bg-sun-soft', 'bg-pink-soft', 'bg-mint-soft', 'bg-sun-soft', 'bg-pink-soft'];
	const tilts = ['-rotate-1', 'rotate-1', '-rotate-[0.6deg]', 'rotate-[0.8deg]', '-rotate-1'];

	const contacts = [
		{
			label: 'Email me',
			icon: 'Email',
			href: 'mailto:mjamaludinnur927@gmail.com',
			color: 'bg-void'
		},
		{ label: 'WhatsApp', icon: 'WhatsApp', href: 'https://wa.me/628818653880', color: 'bg-mint' },
		{ label: 'GitHub', icon: 'GitHub', href: 'https://github.com/koriebruh', color: 'bg-void' },
		{
			label: 'LinkedIn',
			icon: 'LinkedIn',
			href: 'https://www.linkedin.com/in/mjamaludinnur/',
			color: 'bg-sky'
		}
	];
</script>

<svelte:head>
	<title>JamalKya Nanami (菜々美), backend engineer</title>
	<meta
		name="description"
		content="Backend engineer building payment and remittance integrations with Go, Spring Boot, Kafka and PostgreSQL."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:title" content="JamalKya Nanami (菜々美), backend engineer" />
	<meta
		property="og:description"
		content="Payment routing, microservices, and a Best Paper Award. Come say hi."
	/>
	<meta name="theme-color" content="#a9dcf7" />
</svelte:head>

{#snippet heading(
	title: string,
	kanji: string,
	color: string,
	art: string,
	artAlt: string,
	note: string
)}
	<div class="relative mb-14 flex items-end justify-between gap-4">
		<div>
			<div class="flex flex-wrap items-end gap-4">
				<h2 class="relative text-5xl leading-none font-bold sm:text-7xl">
					{title}
					<svg
						viewBox="0 0 100 20"
						preserveAspectRatio="none"
						class="absolute -bottom-4 left-0 h-4 w-full"
						aria-hidden="true"
					>
						<path
							class="draw"
							d="M2 12 C25 4 55 4 98 9"
							fill="none"
							stroke={color}
							stroke-width="5"
							stroke-linecap="round"
							pathLength="1"
						/>
					</svg>
				</h2>
				<span
					lang="ja"
					aria-hidden="true"
					class="wiggle sticker-sm mb-1 rotate-6 rounded-xl bg-sun px-2.5 py-1 font-display text-lg font-bold text-[#1f1d47]"
					>{kanji}</span
				>
			</div>
			<p class="mt-7 -rotate-1 font-hand text-2xl font-bold text-text-muted sm:text-3xl">
				{note}
			</p>
		</div>
		<img
			src={art}
			width="640"
			height="640"
			alt={artAlt}
			loading="lazy"
			class="bob -mb-6 w-24 shrink-0 sm:w-40 md:w-52 lg:w-72"
		/>
	</div>
{/snippet}

{#snippet stack(items: string[])}
	<div class="flex flex-wrap gap-1.5">
		{#each items as tech (tech)}
			{#if hasTechIcon(tech)}
				<Badge class="p-1.5" data-tip={tech}
					><TechIcon name={tech} /><span class="sr-only">{tech}</span></Badge
				>
			{:else}
				<Badge>{tech}</Badge>
			{/if}
		{/each}
	</div>
{/snippet}

<main id="top">
	<!-- HERO: sky scene -->
	<section class="relative overflow-hidden bg-sky">
		<Doodle
			name="sun"
			class="spin-slow absolute top-24 right-[6%] h-20 w-20 text-sun sm:h-28 sm:w-28"
			stroke={6}
		/>
		<Doodle
			name="cloud"
			class="drift absolute top-28 left-[4%] hidden h-16 w-28 sm:block"
			color="var(--color-cloud)"
			stroke={3}
		/>
		<Doodle
			name="cloud"
			class="drift absolute top-[46%] right-[38%] hidden h-12 w-20 lg:block"
			color="var(--color-cloud)"
			stroke={3}
		/>
		<Doodle
			name="star"
			class="absolute top-[30%] left-[48%] hidden h-7 w-7 lg:block"
			color="var(--color-sun)"
			stroke={4}
		/>
		<Doodle
			name="sparkle"
			class="absolute right-[30%] bottom-48 h-8 w-8"
			color="var(--color-accent)"
			stroke={4}
		/>

		<div
			class="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-5 pt-32 pb-44 sm:px-8 lg:grid-cols-[1.25fr_1fr] lg:pt-40"
		>
			<div>
				<p
					class="hero-in mb-2 -rotate-3 font-hand text-4xl font-bold text-text-primary"
					style="--d: 0ms"
				>
					Hi there, I'm
				</p>
				<h1
					style="--d: 120ms"
					class="hero-in hero-name mb-8 text-[clamp(3.6rem,10vw,7.5rem)] leading-[0.92] font-bold tracking-tight"
				>
					JamalKya Nanami
				</h1>
				<p
					class="hero-in mb-2 max-w-[34ch] text-xl leading-relaxed font-semibold sm:text-2xl"
					style="--d: 240ms"
				>
					<span class="tape">Principal AI Engineer*</span>. I tell the robots what to build, then
					fix what the robots built. Somehow the payments still go through.
				</p>
				<p
					class="hero-in mb-8 -rotate-1 font-hand text-2xl font-bold text-text-muted"
					style="--d: 300ms"
				>
					*self-promoted. Real job: backend engineer keeping money moving.
				</p>
				<div class="hero-in flex flex-wrap items-center gap-3" style="--d: 340ms">
					<Button href="#experience">See my work</Button>
					<Button variant="outline" href={cvPdf} download="JamalKya Nanami - CV.pdf"
						>Download CV</Button
					>
				</div>
				<p class="mt-6 flex items-center gap-2 text-base font-bold">
					<span class="h-3 w-3 rounded-full border-2 border-text-primary bg-mint"></span>
					Open to backend roles, based in Jakarta (UTC+7)
				</p>
			</div>

			<div class="hero-in relative mx-auto w-64 sm:w-80" style="--d: 200ms">
				<div class="sticker rotate-3 rounded-2xl bg-[#fff] p-3 pb-4">
					<span
						class="absolute -top-4 left-1/2 h-8 w-24 -translate-x-1/2 -rotate-6 bg-sun/80"
						aria-hidden="true"
					></span>
					<img
						src={mePhoto}
						alt="JamalKya Nanami"
						width="750"
						height="1000"
						fetchpriority="high"
						class="aspect-[4/5] w-full rounded-xl object-cover"
						style="object-position: 50% 22%;"
					/>
					<p class="mt-2 text-center font-hand text-3xl font-bold text-[#1f1d47]">
						that's me! <span lang="ja" class="font-display text-2xl">菜々美</span>
					</p>
				</div>
				<Doodle
					name="heart"
					class="absolute -top-6 -right-5 h-12 w-12 rotate-12"
					color="var(--color-accent)"
					stroke={4}
				/>
				<Doodle
					name="star"
					class="absolute -bottom-6 -left-7 h-12 w-12 -rotate-12"
					color="var(--color-sun)"
					stroke={4}
				/>
			</div>
		</div>

		<img
			src={devPaperPlane}
			width="720"
			height="482"
			alt=""
			class="float absolute right-3 bottom-16 w-32 sm:w-40 lg:right-auto lg:left-[42%] lg:w-52 xl:w-60"
		/>

		<svg
			viewBox="0 0 1440 120"
			preserveAspectRatio="none"
			class="absolute bottom-0 left-0 h-24 w-full sm:h-32"
			aria-hidden="true"
		>
			<path
				d="M0 70 C60 30 120 30 170 60 C210 20 290 10 330 55 C380 25 440 30 470 62 C520 15 610 15 650 58 C700 28 770 28 800 64 C850 18 940 14 980 56 C1030 26 1100 28 1130 62 C1180 20 1260 16 1300 58 C1350 30 1410 32 1440 56 V121 H0 Z"
				fill="var(--color-void)"
			/>
			<path
				d="M0 70 C60 30 120 30 170 60 C210 20 290 10 330 55 C380 25 440 30 470 62 C520 15 610 15 650 58 C700 28 770 28 800 64 C850 18 940 14 980 56 C1030 26 1100 28 1130 62 C1180 20 1260 16 1300 58 C1350 30 1410 32 1440 56"
				fill="none"
				stroke="var(--color-text-primary)"
				stroke-width="3"
				vector-effect="non-scaling-stroke"
			/>
		</svg>
	</section>

	<div class="relative mx-auto max-w-6xl px-5 sm:px-8">
		<!-- EXPERIENCE -->
		<section id="experience" class="relative scroll-mt-24 py-24 sm:py-28">
			<Doodle
				name="star"
				class="twinkle absolute top-[30%] -left-24 hidden h-9 w-9 xl:block"
				color="var(--color-sun)"
				stroke={4}
			/>
			<Doodle
				name="sparkle"
				class="twinkle absolute top-[55%] -right-20 hidden h-8 w-8 xl:block"
				color="var(--color-accent)"
				stroke={4}
			/>
			<Doodle
				name="heart"
				class="twinkle absolute bottom-[15%] -left-20 hidden h-8 w-8 xl:block"
				color="var(--color-lilac)"
				stroke={4}
			/>
			{@render heading(
				"Where I've worked",
				'職歴',
				'var(--color-accent)',
				devAtDesk,
				'Doodle of me coding at a desk while payments fly safely into shields',
				'Newest first. Coffee intake goes up as you scroll up.'
			)}

			<ol class="space-y-14">
				{#each experience as job, i (job.period)}
					<li use:pop class="pop relative max-w-4xl {i % 2 ? 'lg:ml-auto' : ''}">
						<span
							class="sticker-sm absolute -top-5 left-6 z-10 -rotate-2 rounded-full px-4 py-1 font-display text-sm font-semibold text-[#1f1d47] {tabColors[
								i % tabColors.length
							]}">{job.period}</span
						>
						<article
							class="sticker rounded-3xl bg-void p-6 pt-9 sm:p-8 sm:pt-10 {tilts[i % tilts.length]}"
						>
							<div class="mb-5 flex flex-wrap items-center gap-4">
								<LogoSlot name={job.org} src={job.logo} onDark={job.logoOnDark} />
								<div>
									<h3 class="text-2xl leading-tight font-semibold sm:text-3xl">{job.role}</h3>
									<p class="font-semibold text-text-muted">{job.org}, {job.place}</p>
								</div>
							</div>
							<ul class="max-w-[66ch] space-y-2.5 leading-relaxed text-text-muted">
								{#each job.points as point (point)}
									<li class="flex gap-3">
										<Doodle
											name="star"
											class="mt-1 h-4 w-4 shrink-0"
											color="var(--color-sun)"
											stroke={7}
										/>
										<span>{point}</span>
									</li>
								{/each}
							</ul>
							{#if job.assignment}
								{@const a = job.assignment}
								<div
									class="mt-6 rounded-2xl border-[3px] border-dashed border-text-primary/40 bg-sky/25 p-5 sm:p-6"
								>
									<p class="mb-3 -rotate-1 font-hand text-2xl font-bold">{a.since}</p>
									<div class="mb-4 flex flex-wrap items-center gap-4">
										<LogoSlot name="Beyondtech" src={a.logo} />
										<div>
											<h4 class="text-xl leading-tight font-semibold">{a.org}</h4>
											<p class="text-sm font-semibold text-text-muted">{a.about}</p>
										</div>
									</div>
									<ul class="max-w-[66ch] space-y-2.5 leading-relaxed text-text-muted">
										{#each a.points as point (point)}
											<li class="flex gap-3">
												<Doodle
													name="sparkle"
													class="mt-1 h-4 w-4 shrink-0"
													color="var(--color-mint)"
													stroke={7}
												/>
												<span>{point}</span>
											</li>
										{/each}
									</ul>
								</div>
							{/if}
							{#if job.images.length > 0}
								<ImagePlaceholder
									label="Life at {job.org}"
									class="mt-6"
									layout="row"
									images={job.images}
									thumbs={job.thumbs}
								/>
							{/if}
						</article>
						{#if i < experience.length - 1}
							<Doodle
								name="arrow"
								class="absolute -bottom-14 hidden h-14 w-14 text-text-faint lg:block {i % 2
									? 'right-[60%] -scale-x-100'
									: 'left-[60%]'}"
								stroke={4}
							/>
						{/if}
					</li>
				{/each}
			</ol>
		</section>

		<!-- EDUCATION & RESEARCH -->
		<section id="education" class="relative scroll-mt-24 pb-24 sm:pb-28">
			<Doodle
				name="sparkle"
				class="twinkle absolute top-[40%] -left-20 hidden h-9 w-9 xl:block"
				color="var(--color-mint)"
				stroke={4}
			/>
			<Doodle
				name="star"
				class="twinkle absolute -right-24 bottom-[20%] hidden h-8 w-8 xl:block"
				color="var(--color-accent)"
				stroke={4}
			/>
			{@render heading(
				'Where I learned stuff',
				'学歴',
				'var(--color-mint)',
				devGraduation,
				'Doodle of me in a graduation cap holding a trophy',
				'A degree, a few late nights, and one shiny award.'
			)}

			<div class="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
				<article
					use:pop
					class="pop sticker -rotate-1 self-start rounded-3xl bg-mint-soft p-6 sm:p-8"
				>
					<p class="mb-4 font-hand text-2xl font-bold">2022 to 2026, graduated!</p>
					<div class="mb-5 flex flex-wrap items-center gap-4">
						<LogoSlot name="UDINUS" src={udinusLogo} />
						<div>
							<h3 class="text-2xl leading-tight font-semibold">B.Sc. Informatics Engineering</h3>
							<p class="font-semibold text-text-muted">Universitas Dian Nuswantoro, Semarang</p>
						</div>
					</div>
					<div class="mb-6 grid grid-cols-3 gap-3 text-center">
						<div class="sticker-sm rounded-2xl bg-void px-2 py-3">
							<p class="font-display text-2xl font-bold">3.65</p>
							<p class="text-xs font-semibold text-text-muted">GPA out of 4</p>
						</div>
						<div class="sticker-sm rounded-2xl bg-void px-2 py-3">
							<p class="font-display text-2xl font-bold">146</p>
							<p class="text-xs font-semibold text-text-muted">credits</p>
						</div>
						<div class="sticker-sm rounded-2xl bg-void px-2 py-3">
							<p class="font-display text-2xl font-bold">0</p>
							<p class="text-xs font-semibold text-text-muted">failed courses</p>
						</div>
					</div>
					<ImagePlaceholder
						label="Campus days at UDINUS"
						layout="row"
						images={[edu1, edu2, edu3]}
						thumbs={[edu1T, edu2T, edu3T]}
					/>
				</article>

				<article
					use:pop
					class="pop sticker relative rotate-[0.6deg] rounded-3xl bg-sun-soft p-6 sm:p-8"
				>
					<Doodle
						name="sparkle"
						class="absolute -top-6 -right-4 h-14 w-14"
						color="var(--color-sun)"
						stroke={4}
					/>
					<p class="mb-4 font-hand text-2xl font-bold">Dec 2025, my proudest moment</p>
					<div class="mb-5 flex flex-wrap items-center gap-4">
						<LogoSlot name="ISEMANTIC 2025" src={isemanticLogo} onDark />
						<div>
							<h3 class="text-2xl leading-tight font-semibold sm:text-3xl">Best Paper Award</h3>
							<p class="font-semibold text-text-muted">ISEMANTIC 2025, on IEEE Xplore</p>
						</div>
					</div>
					<h4 class="mb-3 text-lg leading-snug font-semibold">
						Improving Customer Churn Prediction Using Domain-Driven Feature Engineering, Resampling,
						and CatBoost with Explainability Extensions
					</h4>
					<p class="mb-5 max-w-[66ch] leading-relaxed text-text-muted">
						I taught a model to spot which telecom customers are about to leave. On the IBM Telco
						dataset (7,043 customers) it reached 0.937 ROC-AUC and 0.863 F1, using SMOTE for class
						imbalance, hand-crafted features, and CatBoost/XGBoost tuned with Optuna. SHAP explains
						every prediction, DICE-ML shows what would change the outcome, and a fairness audit
						caught a 22.55% bias against senior citizens.
					</p>
					<div class="mb-6 flex flex-wrap gap-3">
						<Button size="sm" href={paperPdf} target="_blank" rel="noreferrer"
							>Read the paper</Button
						>
						<Button
							variant="outline"
							size="sm"
							href="https://ieeexplore.ieee.org/document/11291801/"
							target="_blank"
							rel="noreferrer">Open on IEEE Xplore</Button
						>
					</div>
					<ImagePlaceholder
						label="ISEMANTIC 2025, award day"
						layout="row"
						images={[con1, con2, con3]}
						thumbs={[con1T, con2T, con3T]}
					/>
				</article>
			</div>
		</section>

		<!-- PROJECTS -->
		<section id="projects" class="relative scroll-mt-24 pb-24 sm:pb-28">
			<Doodle
				name="star"
				class="twinkle absolute top-[38%] -right-20 hidden h-9 w-9 xl:block"
				color="var(--color-sun)"
				stroke={4}
			/>
			<Doodle
				name="sparkle"
				class="twinkle absolute bottom-[25%] -left-24 hidden h-8 w-8 xl:block"
				color="var(--color-lilac)"
				stroke={4}
			/>
			{@render heading(
				"Things I've built",
				'制作',
				'var(--color-sun)',
				devBuilding,
				'Doodle of me building a city of connected service blocks',
				"Side projects I'm proud of. Tap a card for the full story."
			)}

			<div class="grid gap-10 lg:grid-cols-2">
				{#each projects as project, i (project.name)}
					<article
						use:pop
						class="pop sticker lift flex flex-col rounded-3xl p-3 {i % 2
							? 'bg-sun-soft'
							: 'bg-pink-soft'}"
					>
						<div
							class="flex h-full flex-col rounded-2xl border-[3px] border-dashed border-text-primary/40 p-5 sm:p-7"
						>
							<button
								type="button"
								onclick={() => (openProject = project)}
								class="group mb-4 cursor-pointer text-left"
							>
								<h3 class="text-2xl leading-tight font-semibold group-hover:underline sm:text-3xl">
									{project.name}
								</h3>
							</button>
							<p class="mb-6 text-lg leading-relaxed text-text-muted">{project.quote}</p>
							<div class="mt-auto space-y-5">
								{@render stack(project.stack)}
								<div class="flex flex-wrap gap-3">
									<Button size="sm" onclick={() => (openProject = project)}>More details</Button>
									<Button
										variant="outline"
										size="sm"
										href={project.href}
										target="_blank"
										rel="noreferrer">Source code</Button
									>
									{#if project.docsHref}
										<Button
											variant="outline"
											size="sm"
											href={project.docsHref}
											target="_blank"
											rel="noreferrer">Docs</Button
										>
									{/if}
								</div>
							</div>
						</div>
					</article>
				{/each}
			</div>

			<div class="mt-20 mb-8 flex items-center gap-5">
				<img
					src={devChef}
					width="560"
					height="560"
					alt="Doodle of me cooking up code in a big pot"
					loading="lazy"
					class="bob w-28 shrink-0 sm:w-36"
				/>
				<div>
					<p class="font-hand text-4xl font-bold">Cooking next</p>
					<p class="font-semibold text-text-muted">Ideas simmering on the stove. Not served yet.</p>
				</div>
			</div>
			<div class="grid gap-6 md:grid-cols-3">
				{#each plannedProjects as project (project.name)}
					<article
						use:pop
						class="pop flex flex-col rounded-3xl border-[3px] border-dashed border-text-primary/50 bg-void p-6"
					>
						<h3 class="mb-2 text-lg leading-snug font-semibold">{project.name}</h3>
						<p class="mb-5 text-sm leading-relaxed text-text-muted">{project.summary}</p>
						<div class="mt-auto">{@render stack(project.stack)}</div>
					</article>
				{/each}
			</div>
		</section>

		<!-- STACK -->
		<section id="stack" class="relative scroll-mt-24 pb-24 sm:pb-28">
			<Doodle
				name="heart"
				class="twinkle absolute top-[45%] -left-20 hidden h-8 w-8 xl:block"
				color="var(--color-accent)"
				stroke={4}
			/>
			<Doodle
				name="sparkle"
				class="twinkle absolute top-[30%] -right-24 hidden h-9 w-9 xl:block"
				color="var(--color-mint)"
				stroke={4}
			/>
			{@render heading(
				'My toolbox',
				'技術',
				'var(--color-lilac)',
				devToolbox,
				'Doodle of me with a toolbox full of developer tools',
				'What I reach for when something needs building, or fixing.'
			)}
			<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{#each skills as group, i (group.group)}
					<div
						use:pop
						class="pop sticker relative rounded-2xl p-5 pt-7 {noteColors[
							i % noteColors.length
						]} {tilts[(i + 1) % tilts.length]}"
					>
						<span
							class="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-2 bg-sky/80"
							aria-hidden="true"
						></span>
						<h3 class="mb-4 text-xl font-semibold">{group.group}</h3>
						<div class="flex flex-wrap gap-1.5">
							{#each group.items as item (item)}
								{#if hasTechIcon(item)}
									<Badge class="p-1.5" data-tip={item}
										><TechIcon name={item} /><span class="sr-only">{item}</span></Badge
									>
								{:else}
									<Badge>{item}</Badge>
								{/if}
							{/each}
						</div>
					</div>
				{/each}
				<div
					use:pop
					class="pop relative flex items-center gap-4 rounded-2xl border-[3px] border-dashed border-text-primary/50 bg-void p-5"
				>
					<img
						src={devReading}
						width="560"
						height="560"
						alt="Doodle of me reading on a stack of books"
						loading="lazy"
						class="w-24 shrink-0"
					/>
					<div>
						<h3 class="mb-3 text-xl font-semibold">Learning next</h3>
						<div class="flex flex-wrap gap-1.5">
							{#each ['CQRS', 'Event Sourcing', 'Circuit Breaker'] as next (next)}
								<Badge>{next}</Badge>
							{/each}
						</div>
					</div>
				</div>
			</div>

			<p class="mt-16 mb-6 -rotate-1 font-hand text-3xl font-bold">Patterns I've shipped with</p>
			<div class="grid gap-6 md:grid-cols-3">
				{#each patterns as pt, i (pt.name)}
					<article
						use:pop
						class="pop sticker rounded-2xl p-5 {pt.color} {tilts[(i + 2) % tilts.length]}"
					>
						<h3 class="mb-4 text-xl font-semibold">{pt.name}</h3>
						<ol class="mb-4 flex flex-wrap items-center gap-1.5">
							{#each pt.steps as stepName, j (stepName)}
								<li
									class="sticker-sm rounded-full bg-[#fff] px-3 py-1 font-display text-sm font-semibold text-[#1f1d47]"
								>
									{stepName}
								</li>
								{#if j < pt.steps.length - 1}
									<li aria-hidden="true" class="font-display text-lg font-bold text-text-faint">
										→
									</li>
								{/if}
							{/each}
						</ol>
						<p class="text-sm leading-relaxed text-text-muted">{pt.note}</p>
					</article>
				{/each}
			</div>
		</section>

		<!-- CONTACT -->
		<section id="contact" class="relative scroll-mt-24 pb-16">
			<div
				use:pop
				class="pop sticker relative grid items-center gap-6 rounded-[2.5rem] bg-sun p-8 text-[#1f1d47] sm:p-14 lg:grid-cols-[1.3fr_1fr]"
			>
				<Doodle
					name="plane"
					class="absolute -top-10 right-10 h-20 w-20 rotate-12"
					color="#fff"
					stroke={4}
				/>
				<div>
					<p class="mb-2 font-hand text-3xl font-bold">Say hello!</p>
					<h2 class="mb-5 max-w-[14ch] text-5xl leading-[0.95] font-bold sm:text-7xl">
						Open to backend roles.
					</h2>
					<p class="mb-8 max-w-[46ch] text-lg font-semibold">
						Building payment infrastructure, distributed systems, or anything backend? Send me a
						message. I usually reply within a day.
					</p>
					<div class="flex flex-wrap gap-3">
						{#each contacts as c (c.label)}
							<a
								href={c.href}
								target={c.href.startsWith('mailto') ? undefined : '_blank'}
								rel="noreferrer"
								class="contact-pill lift inline-flex items-center gap-2.5 rounded-full py-2.5 pr-6 pl-2.5 font-display text-lg font-semibold {c.color}"
								><span
									class="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#1f1d47] bg-[#fff]"
									><TechIcon name={c.icon} /></span
								>{c.label}</a
							>
						{/each}
					</div>
				</div>
				<img
					src={devOnCloud}
					width="720"
					height="720"
					alt="Doodle of me on a cloud, typing on a laptop next to servers and a database"
					class="mx-auto w-64 sm:w-80 lg:w-full"
					loading="lazy"
				/>
			</div>

			<img
				src={devSleeping}
				width="560"
				height="560"
				alt="Doodle of me asleep on a laptop with an empty coffee mug"
				loading="lazy"
				class="mx-auto mt-16 w-44 sm:w-52"
			/>
			<p class="mt-4 text-center font-semibold text-text-muted">
				© {new Date().getFullYear()} JamalKya Nanami (菜々美). Drawn with too much coffee.
			</p>
		</section>
	</div>
</main>

<ProjectModal project={openProject} onclose={() => (openProject = null)} />

<style>
	/* hero: one staggered pop-in on load */
	.hero-in {
		animation: pop-in 700ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
		animation-delay: var(--d, 0ms);
	}
	@keyframes pop-in {
		from {
			opacity: 0;
			transform: translateY(26px) scale(0.94);
		}
	}

	/* cards: pop once when scrolled into view (rotation lives in the `rotate` property, so no clash) */
	:global(.pop) {
		opacity: 0;
		transform: translateY(36px) scale(0.97);
		transition:
			opacity 500ms ease,
			transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	:global(.pop.is-in) {
		opacity: 1;
		transform: none;
	}

	/* heading underline draws itself when its card section pops */
	.draw {
		stroke-dasharray: 1;
		stroke-dashoffset: 0;
		animation: draw 900ms 200ms ease-out both;
	}
	@keyframes draw {
		from {
			stroke-dashoffset: 1;
		}
	}

	/* gentle ambient motion for the sky */
	:global(.drift) {
		animation: drift 14s ease-in-out infinite alternate;
	}
	@keyframes drift {
		to {
			translate: 40px 0;
		}
	}
	:global(.spin-slow) {
		animation: spin 40s linear infinite;
	}
	@keyframes spin {
		to {
			rotate: 360deg;
		}
	}
	.float {
		animation: float 5s ease-in-out infinite;
	}
	@keyframes float {
		50% {
			translate: 0 -14px;
			rotate: -3deg;
		}
	}
	.bob {
		animation: float 6s ease-in-out infinite;
	}
	:global(.twinkle) {
		animation: twinkle 3.5s ease-in-out infinite;
	}
	:global(.twinkle:nth-of-type(2n)) {
		animation-delay: -1.7s;
	}
	@keyframes twinkle {
		50% {
			scale: 0.75;
			rotate: 18deg;
		}
	}
	.wiggle:hover {
		animation: wiggle 400ms ease;
	}
	@keyframes wiggle {
		25% {
			rotate: -6deg;
		}
		75% {
			rotate: 14deg;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-in,
		.draw,
		.float,
		.bob,
		:global(.drift),
		:global(.twinkle),
		:global(.spin-slow) {
			animation: none;
		}
		:global(.pop) {
			opacity: 1;
			transform: none;
		}
	}

	/* washi-tape label, same yellow tape as the polaroid */
	.tape {
		display: inline-block;
		margin: 0 0.1em 0 0;
		padding: 0.05em 0.5em;
		rotate: -2deg;
		color: #1f1d47;
		background: color-mix(in srgb, var(--color-sun) 75%, transparent);
		border-block: 1px solid color-mix(in srgb, #fff 55%, transparent);
		box-shadow: 0 1px 0 color-mix(in srgb, #1f1d47 12%, transparent);
	}
	.hero-name {
		color: #fff;
		-webkit-text-stroke: 3px #1f1d47;
		paint-order: stroke fill;
		text-shadow: 6px 6px 0 var(--color-accent);
	}
	/* pills on the yellow card always use light-theme ink */
	.contact-pill {
		color: #1f1d47;
		border: 3px solid #1f1d47;
		box-shadow: 4px 4px 0 #1f1d47;
	}
	.contact-pill.bg-void {
		background: #fff;
	}
	.contact-pill.bg-sky {
		background: #a9dcf7;
	}
</style>
